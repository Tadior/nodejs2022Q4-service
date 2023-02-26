import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { IdDto } from 'src/dto/id.dto';
import { jwtGuard } from 'src/guards/jwt.guard';
import { WhitelistPipe } from 'src/validation/whitelist.validation';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @UseGuards(jwtGuard)
  @Get()
  getAllUsers() {
    return this.service.getAllUsers();
  }
  @UseGuards(jwtGuard)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getUserById(id);
  }
  @UseGuards(jwtGuard)
  @Post()
  createUser(
    @Body(WhitelistPipe)
    body: CreateUserDto,
  ) {
    return this.service.create(body);
  }
  @UseGuards(jwtGuard)
  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: IdDto,
    @Body(WhitelistPipe) body: UpdatePasswordDto,
  ) {
    return this.service.updatePassword(id, body);
  }
  @UseGuards(jwtGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.deleteUser(id);
  }
}
