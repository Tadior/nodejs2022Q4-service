import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../orm.config';
import { AlbumModule } from './endpoints/album/album.module';
import { ArtistModule } from './endpoints/artist/artist.module';
import { AuthModule } from './endpoints/auth/auth.module';
import { FavoriteModule } from './endpoints/favorite/favorite.module';
import { TrackModule } from './endpoints/track/track.module';
import { UserModule } from './endpoints/user/user.module';
import { LoggerModule } from './logger/customLogger.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    AuthModule,
    LoggerModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
