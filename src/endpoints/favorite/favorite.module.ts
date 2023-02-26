import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { UserModule } from '../user/user.module';
import { FavoriteEntity } from './entity/favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtStrategy],
})
export class FavoriteModule {}
