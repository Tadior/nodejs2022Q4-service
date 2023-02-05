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
import { ArtistService } from './artist.service';
import { IdDto } from 'src/dto/id.dto';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly service: ArtistService) {}
  @Get()
  getAllTracks() {
    return this.service.getAll();
  }
  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getById(id);
  }
  @Post()
  createTrack(@Body() body: ArtistDto) {
    return this.service.create(body);
  }
  @Put(':id')
  updateTrack(@Param('id', ParseUUIDPipe) id: IdDto, @Body() body: ArtistDto) {
    return this.service.update(id, body);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id);
  }
}
