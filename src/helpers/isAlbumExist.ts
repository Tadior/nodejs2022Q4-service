import { IDatabase } from 'src/database/IDataBase';
import { HttpException, HttpStatus } from '@nestjs/common';

export const isAlbumExist = (
  database: IDatabase,
  searchId: string,
): boolean => {
  const albumIndex = database.albums.findIndex((album) => {
    if (album.id === searchId) {
      return album;
    }
  });
  if (albumIndex === -1) {
    throw new HttpException(
      'Album with such id is not foud',
      HttpStatus.NOT_FOUND,
    );
  }
  return true;
};
