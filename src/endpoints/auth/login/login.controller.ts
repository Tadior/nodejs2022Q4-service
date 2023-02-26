import { Body, Controller, Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { WhitelistPipe } from 'src/validation/whitelist.validation';
import { AuthEntity } from '../entity/auth.entity';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly service: LoginService) {}
  @Post('login')
  @HttpCode(200)
  login(@Body(WhitelistPipe) body: AuthEntity) {
    return this.service.login(body);
  }
}
