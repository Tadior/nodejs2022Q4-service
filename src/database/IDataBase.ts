import { Album, Artist, Favorites, Track, User } from 'src/types/apiTypes';

export interface IDatabase {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
