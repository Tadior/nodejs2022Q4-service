import { Module } from '@nestjs/common';
import { UserModule } from './endpoints/user/user.module';
import { TrackModule } from './endpoints/track/track.module';
import { ArtistModule } from './endpoints/artist/artist.module';
import { AlbumModule } from './endpoints/album/album.module';
import { FavoriteModule } from './endpoints/favorite/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
  ],
})
export class AppModule {}
