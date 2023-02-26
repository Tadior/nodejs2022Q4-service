import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackEntity } from './entity/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AlbumModule, ArtistModule],
  controllers: [TrackController],
  providers: [TrackService, JwtStrategy],
  exports: [TrackService, TypeOrmModule],
})
export class TrackModule {}
