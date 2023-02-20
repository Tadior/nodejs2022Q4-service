import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { User, UserResponse } from 'src/types/apiTypes';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { IdDto } from 'src/dto/id.dto';
import { makeUserResponse } from './helpers/makeUserResponse';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => {
      return makeUserResponse(user);
    });
  }

  async getUserById(@Param() idDto: IdDto): Promise<UserResponse> {
    const userId = idDto as unknown as string;
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(
        "User with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }

    return makeUserResponse(user);
  }

  async create(body: CreateUserDto): Promise<UserResponse> {
    const user: User = {
      login: body.login,
      password: body.password,
      version: 1,
    };

    const createdUser = await this.usersRepository.save(user);

    return makeUserResponse(createdUser);
  }

  async updatePassword(
    @Param() idDto: IdDto,
    body: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const userId = idDto as unknown as string;
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(
        'User with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.password !== body.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    user.password = body.newPassword;
    user.version++;

    await this.usersRepository.save(user);
    return makeUserResponse(user);
  }
  async deleteUser(@Param() idDto: IdDto) {
    const userId = idDto as undefined as string;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException(
        'User with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersRepository.remove(user);
  }
}
