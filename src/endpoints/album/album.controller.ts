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
import { AlbumService } from './album.service';
import { IdDto } from 'src/dto/id.dto';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly service: AlbumService) {}
  @Get()
  getAllAlbums() {
    return this.service.getAll();
  }
  @Get(':id')
  getAlbumById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getById(id);
  }
  @Post()
  createAlbum(@Body() body: AlbumDto) {
    return this.service.create(body);
  }
  @Put(':id')
  updateAlbum(@Param('id', ParseUUIDPipe) id: IdDto, @Body() body: AlbumDto) {
    return this.service.update(id, body);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id);
  }
}
