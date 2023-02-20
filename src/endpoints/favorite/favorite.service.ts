import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entity/favorite.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { AlbumEntity } from '../album/entity/album.entity';
import { TrackEntity } from '../track/entity/track.entity';

type IField = 'tracks' | 'artists' | 'albums';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
  ) {}

  async getAllFavorites(): Promise<FavoriteEntity> {
    const [favorites] = await this.favoriteRepository.find({
      relations: {
        artists: true,
        tracks: true,
        albums: true,
      },
    });

    if (!favorites) {
      await this.favoriteRepository.save(new FavoriteEntity());
      return this.getAllFavorites();
    }

    return favorites;
  }

  async add(@Param() idDto: IdDto, field: IField) {
    const favorites = await this.getAllFavorites();
    const searchId = idDto as unknown as string;
    let data;

    switch (field) {
      case 'tracks':
        const track = await this.tracksRepository.findOneBy({ id: searchId });

        if (!track) {
          throw new HttpException(
            'UNPROCESSABLE_ENTITY',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const isTrackExist = favorites.tracks.includes(track);

        if (!isTrackExist) {
          favorites.tracks.push(track);
        }

        await this.favoriteRepository.save(favorites);
        break;
      case 'artists':
        const artist = await this.artistsRepository.findOneBy({ id: searchId });

        if (!artist) {
          throw new HttpException(
            'UNPROCESSABLE_ENTITY',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const isArtistExist = favorites.artists.includes(artist);

        if (!isArtistExist) {
          favorites.artists.push(artist);
        }

        await this.favoriteRepository.save(favorites);
        break;
      case 'albums':
        const album = await this.albumsRepository.findOneBy({ id: searchId });

        if (!album) {
          throw new HttpException(
            'UNPROCESSABLE_ENTITY',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const isAlbumExist = favorites.albums.includes(album);

        if (!isAlbumExist) {
          favorites.albums.push(album);
        }

        await this.favoriteRepository.save(favorites);

        break;
    }

    return `${field.slice(0, -1)} was added to favorites`;
  }

  async delete(@Param() idDto: IdDto, field: IField) {
    const id = idDto as unknown as string;
    const favorites = await this.getAllFavorites();
    const trackIndex = favorites[field].findIndex(
      (trackId) => trackId.id === id,
    );

    if (trackIndex === -1) {
      throw new HttpException(
        `${field.slice(0, -1)} with such id is not favorite`,
        HttpStatus.NO_CONTENT,
      );
    }

    favorites[field].splice(trackIndex, 1);

    await this.favoriteRepository.save(favorites);

    return `${field.slice(0, -1)} was deleted from favorites`;
  }
}
