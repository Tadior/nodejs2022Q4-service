import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDbEntity } from '../entity/authDb.entity';

@Injectable()
export class AuthDbService {
  constructor(
    @InjectRepository(AuthDbEntity)
    private authRepository: Repository<AuthDbEntity>,
  ) {}
}
