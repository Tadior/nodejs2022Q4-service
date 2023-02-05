import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { Album } from 'src/types/apiTypes';
import { AlbumDto } from './dto/album.dto';
import { DataBaseService } from 'src/database/database.service';
import { isArtistExist } from 'src/helpers/isArtistExist';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(DataBaseService) private DataBaseService: DataBaseService, // private tracks: Track[],
  ) {
    this.DataBaseService = DataBaseService;
  }
  private readonly albums = this.DataBaseService.database.albums;
  getAll(): Album[] {
    return this.albums;
  }
  getById(@Param() idDto: IdDto): Album {
    const albumId = idDto as unknown as string;
    const album = this.albums.find((album) => {
      if (album.id === albumId) {
        return album;
      }
    });
    if (!album) {
      throw new HttpException(
        "Album with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }
  create(body: AlbumDto): Album {
    if (body.artistId) {
      isArtistExist(this.DataBaseService.database, body.artistId);
    }
    const album = {
      id: uuidv4(),
      name: body.name,
      year: body.year,
      artistId: body.artistId ? body.artistId : null,
    };
    this.albums.push(album);
    return album;
  }
  update(@Param() idDto: IdDto, body: AlbumDto): Album {
    if (body.artistId) {
      isArtistExist(this.DataBaseService.database, body.artistId);
    }
    const albumId = idDto as unknown as string;
    const album = this.albums.find((album) => {
      if (album.id === albumId) {
        return album;
      }
    });
    if (!album) {
      throw new HttpException(
        'Album with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    album.name = body.name;
    album.year = body.year;
    album.artistId = body.artistId ? body.artistId : album.artistId;
    return album;
  }
  delete(@Param() idDto: IdDto) {
    const albumId = idDto as unknown as string;
    const albumIndex = this.albums.findIndex((album) => {
      if (album.id === albumId) {
        return album;
      }
    });
    if (albumIndex === -1) {
      throw new HttpException(
        'Album with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    this.DataBaseService.database.tracks.filter((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
    this.albums.splice(albumIndex, 1);
  }
}
