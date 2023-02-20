import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { ArtistModule } from '../artist/artist.module';
@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), ArtistModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService, TypeOrmModule],
})
export class AlbumModule {}
