import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { ArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistsRepository.find();
  }

  async getById(@Param() idDto: IdDto): Promise<ArtistEntity> {
    const artistId = idDto as unknown as string;
    const artist = await this.artistsRepository.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(
        "User with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async create(body: ArtistDto): Promise<ArtistEntity> {
    const artist = {
      name: body.name,
      grammy: body.grammy,
    };

    return await this.artistsRepository.save(artist);
  }

  async update(@Param() idDto: IdDto, body: ArtistDto): Promise<ArtistEntity> {
    const artistId = idDto as unknown as string;
    const artist = await this.artistsRepository.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(
        'Artist with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    artist.name = body.name;
    artist.grammy = body.grammy;

    return this.artistsRepository.save(artist);
  }

  async delete(@Param() idDto: IdDto) {
    const artistId = idDto as unknown as string;
    const artist = await this.artistsRepository.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(
        'Artist with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    // this.DataBaseService.database.albums.filter((album) => {
    //   if (album.artistId === artistId) {
    //     album.artistId = null;
    //   }
    // });

    // this.DataBaseService.database.tracks.filter((track) => {
    //   if (track.artistId === artistId) {
    //     track.artistId = null;
    //   }
    // });

    await this.artistsRepository.remove(artist);
  }
}
