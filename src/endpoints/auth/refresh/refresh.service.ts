import { Body, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/endpoints/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthDbEntity } from '../entity/authDb.entity';
import { LoginService } from '../login/login.service';
import { RefreshEntity } from './entity/refresh.entity';

@Injectable()
export class RefreshService {
  @Inject(LoginService)
  private readonly itemService: LoginService;

  constructor(
    @InjectRepository(AuthDbEntity)
    private authRepository: Repository<AuthDbEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getRefreshToken(@Body() refreshDto: RefreshEntity) {
    const { refreshToken } = refreshDto;
    const refreshData = await this.authRepository.findOneBy({ refreshToken });

    if (!refreshData) {
      throw new HttpException(`Token isn't valid or expired`, 403);
    }

    const user = await this.userRepository.findOneBy({ id: refreshData.id });

    const newTokens = await this.itemService.generateTokens(
      user.id,
      user.login,
    );

    await this.itemService.saveToken(refreshData.id, newTokens.refreshToken);
    return newTokens;
  }
}
