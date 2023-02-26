import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/endpoints/user/entity/user.entity';
import { User } from 'src/types/apiTypes';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entity/auth.entity';

dotenv.config();

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(@Body() authDto: AuthEntity) {
    const { login, password } = authDto;
    const user = await this.userRepository.findOneBy({ login });
    const salt = Number(process.env.CRYPT_SALT);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser: User = {
      login,
      password: hashedPassword,
      version: 1,
    };

    await this.userRepository.save(newUser);

    return { id: newUser.id };
  }
}
