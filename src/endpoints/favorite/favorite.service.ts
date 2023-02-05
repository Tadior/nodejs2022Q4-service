import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { Favorites, FavoritesRepsonse } from 'src/types/apiTypes';
import { ErrorResponse } from 'src/types/errorResponse';
import { TrackService } from '../track/track.service';
import { DataBaseService } from 'src/database/database.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { filterFavourite } from './helpers/filterFavourite';

type IField = 'tracks' | 'artists' | 'albums';

@Injectable()
export class FavoriteService {
  @Inject(ArtistService)
  private readonly ArtistService: ArtistService;
  @Inject(AlbumService)
  private readonly AlbumService: AlbumService;
  @Inject(TrackService)
  private readonly TrackService: TrackService;
  constructor(
    @Inject(DataBaseService) private DataBaseService: DataBaseService,
  ) {
    this.DataBaseService = DataBaseService;
  }
  private readonly favorites: Favorites =
    this.DataBaseService.database.favorites;
  getAllFavorites(): FavoritesRepsonse {
    return {
      artists: filterFavourite(
        this.favorites.artists,
        this.DataBaseService.database.artists,
      ),
      albums: filterFavourite(
        this.favorites.albums,
        this.DataBaseService.database.albums,
      ),
      tracks: filterFavourite(
        this.favorites.tracks,
        this.DataBaseService.database.tracks,
      ),
    };
  }
  add(@Param() idDto: IdDto, field: IField): string {
    try {
      let data;
      switch (field) {
        case 'tracks':
          data = this.TrackService.getById(idDto);
          break;
        case 'artists':
          data = this.ArtistService.getById(idDto);
          break;
        case 'albums':
          data = this.AlbumService.getById(idDto);
          break;
      }
      this.favorites[field].push(data.id);
      return `${field.slice(0, -1)} was added to favorites`;
    } catch (e) {
      const error = e as ErrorResponse;
      if (error.status === 404) {
        throw new HttpException(
          `${field.slice(0, -1)} with such id is not found`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  delete(@Param() idDto: IdDto, field: IField) {
    const id = idDto as unknown as string;
    const trackIndex = this.favorites[field].findIndex(
      (trackId) => trackId === id,
    );
    if (trackIndex === -1) {
      throw new HttpException(
        `${field.slice(0, -1)} with such id is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.favorites[field].splice(trackIndex, 1);
    return `${field.slice(0, -1)} was deleted from favorites`;
  }
}
