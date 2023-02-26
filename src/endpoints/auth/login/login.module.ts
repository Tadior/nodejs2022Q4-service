import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/endpoints/user/user.module';
import { AuthDbModule } from '../authDb/authDb.module';
import { AuthEntity } from '../entity/auth.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule, AuthDbModule],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [LoginService, LoginModule],
})
export class LoginModule {}
