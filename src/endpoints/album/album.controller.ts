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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly service: AlbumService) {}
  @UseGuards(jwtGuard)
  @Get()
  getAllAlbums() {
    return this.service.getAll();
  }
  @UseGuards(jwtGuard)
  @Get(':id')
  getAlbumById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getById(id);
  }
  @UseGuards(jwtGuard)
  @Post()
  createAlbum(@Body(WhitelistPipe) body: AlbumDto) {
    return this.service.create(body);
  }
  @UseGuards(jwtGuard)
  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: IdDto,
    @Body(WhitelistPipe) body: AlbumDto,
  ) {
    return this.service.update(id, body);
  }
  @UseGuards(jwtGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id);
  }
}
