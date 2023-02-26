import { TrackEntity } from 'src/endpoints/track/entity/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @OneToMany(() => TrackEntity, (track: TrackEntity) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: TrackEntity[];
}
