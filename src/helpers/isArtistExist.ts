// import { IDatabase } from 'src/database/IDataBase';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ArtistEntity } from 'src/endpoints/artist/entity/artist.entity';
import { Repository } from 'typeorm';

export const isArtistExist = async (
  database: Repository<ArtistEntity>,
  searchId: string,
): Promise<boolean> => {
  const artist = await database.findOneBy({ id: searchId });

  if (!artist) {
    throw new HttpException(
      'Artist with such id is not found',
      HttpStatus.NOT_FOUND,
    );
  }

  return true;
};
