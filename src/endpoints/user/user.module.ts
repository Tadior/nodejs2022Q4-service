import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/customLogger.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
