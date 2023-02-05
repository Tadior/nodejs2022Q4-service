import { Module } from '@nestjs/common';
import { DataBaseService } from './database.service';
import { Global } from '@nestjs/common/decorators';
@Global()
@Module({ providers: [DataBaseService], exports: [DataBaseService] })
export class DatabaseModule {}
