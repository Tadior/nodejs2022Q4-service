import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { IdDto } from 'src/dto/id.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get()
  getAllUsers() {
    return this.service.getAllUsers();
  }
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getUserById(id);
  }
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }
  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: IdDto,
    @Body() body: UpdatePasswordDto,
  ) {
    return this.service.updatePassword(id, body);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.deleteUser(id);
  }
}
