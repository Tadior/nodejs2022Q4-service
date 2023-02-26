import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ArtistModule } from '../artist/artist.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entity/album.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), ArtistModule],
  controllers: [AlbumController],
  providers: [AlbumService, JwtStrategy],
  exports: [AlbumService, TypeOrmModule],
})
export class AlbumModule {}
