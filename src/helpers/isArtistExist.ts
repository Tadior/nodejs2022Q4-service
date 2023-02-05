import { IDatabase } from 'src/database/IDataBase';
import { HttpException, HttpStatus } from '@nestjs/common';

export const isArtistExist = (
  database: IDatabase,
  searchId: string,
): boolean => {
  const artistIndex = database.artists.findIndex((artist) => {
    if (artist.id === searchId) {
      return artist;
    }
  });
  if (artistIndex === -1) {
    throw new HttpException(
      'Artist with such id is not foud',
      HttpStatus.NOT_FOUND,
    );
  }
  return true;
};
