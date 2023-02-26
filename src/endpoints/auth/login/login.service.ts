import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/endpoints/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entity/auth.entity';
import { AuthDbEntity } from '../entity/authDb.entity';

dotenv.config();

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AuthDbEntity)
    private authRepository: Repository<AuthDbEntity>,
  ) {}

  async login(@Body() authDto: AuthEntity) {
    const { login, password } = authDto;
    const user = await this.userRepository.findOneBy({ login });

    if (!user) {
      throw new HttpException(
        "User with such login isn't found",
        HttpStatus.FORBIDDEN,
      );
    }

    if (await bcrypt.compare(user.password, password)) {
      throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN);
    }

    const tokens = this.generateTokens(user.id, user.login);
    await this.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }

  generateTokens(id: string, login: string) {
    const payload = { id, login };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
      expiresIn: '1d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(id: string, refreshToken: string) {
    const token = await this.authRepository.findOneBy({ id });

    if (token) {
      token.refreshToken = refreshToken;
      return await this.authRepository.save(token);
    }

    const newToken = await this.authRepository.save({ id, refreshToken });

    return newToken;
  }
}
