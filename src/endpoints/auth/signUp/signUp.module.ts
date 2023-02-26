import { Module } from '@nestjs/common';
import { AuthEntity } from '../entity/auth.entity';
// import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/endpoints/user/user.module';
import { SignUpController } from './signUp.controller';
import { SignUpService } from './signUp.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule],
  providers: [SignUpService],
  controllers: [SignUpController],
  // exports: [SignUpService],
})
export class SignUpModule {}
