import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { IdDto } from 'src/dto/id.dto';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/entity/album.entity';
import { isAlbumExist } from 'src/helpers/isAlbumExist';
import { isArtistExist } from 'src/helpers/isArtistExist';
import { ArtistEntity } from '../artist/entity/artist.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return await this.tracksRepository.find();
  }

  async getById(@Param() idDto: IdDto): Promise<TrackEntity> {
    const trackId = idDto as unknown as string;
    const track = await this.tracksRepository.findOneBy({ id: trackId });

    if (!track) {
      throw new HttpException(
        "Track with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }
  async create(body: TrackDto): Promise<TrackEntity> {
    if (body.albumId) {
      await isAlbumExist(this.albumsRepository, body.albumId);
    }

    if (body.artistId) {
      await isArtistExist(this.artistRepository, body.artistId);
    }

    const track = {
      name: body.name,
      artistId: body.artistId ? body.artistId : null,
      albumId: body.albumId ? body.albumId : null,
      duration: body.duration,
    };
    return await this.tracksRepository.save(track);
  }

  async update(@Param() idDto: IdDto, body: TrackDto): Promise<TrackEntity> {
    if (body.albumId) {
      await isAlbumExist(this.albumsRepository, body.albumId);
    }

    if (body.artistId) {
      await isArtistExist(this.artistRepository, body.artistId);
    }
    const trackId = idDto as unknown as string;
    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new HttpException(
        'Track with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    track.name = body.name;
    track.artistId = body.artistId ? body.artistId : track.artistId;
    track.albumId = body.albumId ? body.albumId : track.albumId;
    track.duration = body.duration;
    return await this.tracksRepository.save(track);
  }

  async delete(@Param() idDto: IdDto) {
    const trackId = idDto as unknown as string;
    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new HttpException(
        'Track with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.tracksRepository.remove(track);
  }
}
