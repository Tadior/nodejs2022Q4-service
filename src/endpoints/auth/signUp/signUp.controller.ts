import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WhitelistPipe } from 'src/validation/whitelist.validation';
import { AuthEntity } from '../entity/auth.entity';
import { SignUpService } from './signUp.service';

@Controller('auth')
export class SignUpController {
  constructor(private readonly service: SignUpService) {}

  @Post('signup')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: () => {
        return new BadRequestException();
      },
    }),
  )
  @HttpCode(201)
  signUp(@Body(WhitelistPipe) body: AuthEntity) {
    return this.service.signUp(body);
  }
}
