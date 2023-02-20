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
import { TrackService } from './track.service';
import { IdDto } from 'src/dto/id.dto';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly service: TrackService) {}
  @Get()
  getAllTracks() {
    return this.service.getAll();
  }
  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getById(id);
  }
  @Post()
  createTrack(@Body() body: TrackDto) {
    return this.service.create(body);
  }
  @Put(':id')
  updateTrack(@Param('id', ParseUUIDPipe) id: IdDto, @Body() body: TrackDto) {
    return this.service.update(id, body);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id);
  }
}
