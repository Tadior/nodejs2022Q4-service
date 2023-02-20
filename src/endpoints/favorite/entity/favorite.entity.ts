import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/endpoints/album/entity/album.entity';
import { ArtistEntity } from 'src/endpoints/artist/entity/artist.entity';
import { TrackEntity } from 'src/endpoints/track/entity/track.entity';
import { Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @JoinTable()
  @ManyToMany(() => ArtistEntity, { onDelete: 'CASCADE', eager: true })
  artists: ArtistEntity[];

  @JoinTable()
  @ManyToMany(() => AlbumEntity, { onDelete: 'CASCADE', eager: true })
  albums: AlbumEntity[];

  @JoinTable()
  @ManyToMany(() => TrackEntity, { onDelete: 'CASCADE', eager: true })
  tracks: TrackEntity[];
}
