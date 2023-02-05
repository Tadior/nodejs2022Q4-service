import { Injectable } from '@nestjs/common';
import { IDatabase } from './IDataBase';
@Injectable()
export class DataBaseService {
  database: IDatabase = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };
}
