import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthDbEntity } from '../entity/authDb.entity';
import { AuthDbService } from './authDb.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthDbEntity])],
  providers: [AuthDbService],
  exports: [TypeOrmModule],
})
export class AuthDbModule {}
