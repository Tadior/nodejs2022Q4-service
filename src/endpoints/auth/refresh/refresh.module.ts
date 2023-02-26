import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/endpoints/user/entity/user.entity';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthEntity } from '../entity/auth.entity';
import { AuthDbEntity } from '../entity/authDb.entity';
import { LoginModule } from '../login/login.module';
import { RefreshController } from './refresh.controller';
import { RefreshService } from './refresh.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, AuthDbEntity, UserEntity]),
    LoginModule,
  ],
  providers: [RefreshService, JwtStrategy],
  controllers: [RefreshController],
})
export class RefreshModule {}
