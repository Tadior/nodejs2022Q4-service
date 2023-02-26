import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { AlbumDto } from './dto/album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { Repository } from 'typeorm';
import { isArtistExist } from 'src/helpers/isArtistExist';
import { ArtistEntity } from '../artist/entity/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this.albumsRepository.find();
  }

  async getById(@Param() idDto: IdDto): Promise<AlbumEntity> {
    const albumId = idDto as unknown as string;
    const album = await this.albumsRepository.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(
        "Album with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async create(body: AlbumDto): Promise<AlbumEntity> {
    if (body.artistId) {
      await isArtistExist(this.artistsRepository, body.artistId);
    }

    const album = {
      name: body.name,
      year: body.year,
      artistId: body.artistId ? body.artistId : null,
    };

    return await this.albumsRepository.save(album);
  }

  async update(@Param() idDto: IdDto, body: AlbumDto): Promise<AlbumEntity> {
    if (body.artistId) {
      await isArtistExist(this.artistsRepository, body.artistId);
    }

    const albumId = idDto as unknown as string;
    const album = await this.albumsRepository.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(
        'Album with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    album.name = body.name;
    album.year = body.year;
    album.artistId = body.artistId ? body.artistId : album.artistId;

    return await this.albumsRepository.save(album);
  }

  async delete(@Param() idDto: IdDto) {
    const albumId = idDto as unknown as string;
    const album = await this.albumsRepository.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(
        'Album with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumsRepository.remove(album);
  }
}
