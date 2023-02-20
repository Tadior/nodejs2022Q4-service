import { ArtistEntity } from 'src/endpoints/artist/entity/artist.entity';
import { TrackEntity } from 'src/endpoints/track/entity/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  artistId: string | null;
  @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
  @OneToMany(() => TrackEntity, (track: TrackEntity) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks: TrackEntity[];
}
