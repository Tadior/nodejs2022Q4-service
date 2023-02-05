import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { Artist } from 'src/types/apiTypes';
import { ArtistDto } from './dto/artist.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(DataBaseService) private DataBaseService: DataBaseService,
  ) {
    this.DataBaseService = DataBaseService;
  }
  private readonly artists = this.DataBaseService.database.artists;
  getAll(): Artist[] {
    return this.artists;
  }
  getById(@Param() idDto: IdDto): Artist {
    const artistId = idDto as unknown as string;
    const artist = this.artists.find((artist) => {
      if (artist.id === artistId) {
        return artist;
      }
    });
    if (!artist) {
      throw new HttpException(
        "User with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }
  create(body: ArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      name: body.name,
      grammy: body.grammy,
    };
    this.artists.push(artist);
    return artist;
  }
  update(@Param() idDto: IdDto, body: ArtistDto): Artist {
    const artistId = idDto as unknown as string;
    const artist = this.artists.find((artist) => {
      if (artist.id === artistId) {
        return artist;
      }
    });
    if (!artist) {
      throw new HttpException(
        'Artist with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    artist.name = body.name;
    artist.grammy = body.grammy;
    return artist;
  }
  delete(@Param() idDto: IdDto) {
    const artistId = idDto as unknown as string;
    const artistIndex = this.artists.findIndex((artist) => {
      if (artist.id === artistId) {
        return artist;
      }
    });
    if (artistIndex === -1) {
      throw new HttpException(
        'Artist with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    this.DataBaseService.database.albums.filter((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
    this.DataBaseService.database.tracks.filter((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
    this.artists.splice(artistIndex, 1);
  }
}
