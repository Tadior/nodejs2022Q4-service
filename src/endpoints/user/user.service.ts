import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { User, UserResponse } from 'src/types/apiTypes';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { IdDto } from 'src/dto/id.dto';
import { makeUserResponse } from './helpers/makeUserResponse';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAllUsers(): UserResponse[] {
    return this.users.map((user) => {
      return makeUserResponse(user);
    });
  }
  getUserById(@Param() idDto: IdDto): UserResponse {
    const user = this.users.find((user) => {
      if (user.id === (idDto as unknown as string)) {
        return user;
      }
    });
    if (!user) {
      throw new HttpException(
        "User with such id isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    return makeUserResponse(user);
  }
  create(body: CreateUserDto): UserResponse {
    const user: User = {
      id: uuidv4(),
      login: body.login,
      password: body.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return makeUserResponse(user);
  }
  updatePassword(@Param() idDto: IdDto, body: UpdatePasswordDto): UserResponse {
    const userId = idDto as unknown as string;
    const user = this.users.find((user) => {
      if (user.id === userId) {
        return user;
      }
    });
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
    user.updatedAt = Date.now();
    return makeUserResponse(user);
  }
  deleteUser(@Param() idDto: IdDto) {
    const userId = idDto as undefined as string;
    const userIndex = this.users.findIndex((user) => {
      if (user.id === userId) {
        return true;
      }
    });
    if (userIndex === -1) {
      throw new HttpException(
        'User with such id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    this.users.splice(userIndex, 1);
    return 'User was deleted';
  }
}