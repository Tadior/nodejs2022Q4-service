import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthDbEntity } from './entity/authDb.entity';
import { LoginModule } from './login/login.module';
import { RefreshModule } from './refresh/refresh.module';
import { SignUpModule } from './signUp/signUp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthDbEntity]),
    SignUpModule,
    LoginModule,
    RefreshModule,
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
