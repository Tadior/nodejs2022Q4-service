import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TrackModule } from '../track/track.module';
import { UserModule } from '../user/user.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entity/favorite.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
