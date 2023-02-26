import { HttpException, HttpStatus } from '@nestjs/common';
import { AlbumEntity } from 'src/endpoints/album/entity/album.entity';
import { Repository } from 'typeorm';

export const isAlbumExist = async (
  database: Repository<AlbumEntity>,
  searchId: string,
): Promise<boolean> => {
  const album = await database.findOneBy({ id: searchId });

  if (!album) {
    throw new HttpException(
      'Album with such id is not foud',
      HttpStatus.NOT_FOUND,
    );
  }
  return true;
};
