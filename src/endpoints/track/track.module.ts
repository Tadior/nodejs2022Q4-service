import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AlbumModule, ArtistModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService, TypeOrmModule],
})
export class TrackModule {}
