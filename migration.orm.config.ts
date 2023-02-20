import 'dotenv/config';
import { AlbumEntity } from 'src/endpoints/album/entity/album.entity';
import { ArtistEntity } from 'src/endpoints/artist/entity/artist.entity';
import { FavoriteEntity } from 'src/endpoints/favorite/entity/favorite.entity';
import { TrackEntity } from 'src/endpoints/track/entity/track.entity';
import { UserEntity } from 'src/endpoints/user/entity/user.entity';
import { DataSource } from 'typeorm';

export const config = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT as string) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [
    UserEntity,
    AlbumEntity,
    FavoriteEntity,
    ArtistEntity,
    TrackEntity,
  ],
  synchronize: false,
  migrations: [__dirname + '/db/migrations/*.js'],
});
