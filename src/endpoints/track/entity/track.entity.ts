import { AlbumEntity } from 'src/endpoints/album/entity/album.entity';
import { ArtistEntity } from 'src/endpoints/artist/entity/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  artistId: string;
  @Column({ nullable: true })
  albumId: string;
  @Column()
  duration: number;
  @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
  @ManyToOne(() => AlbumEntity, (album: AlbumEntity) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;
}
