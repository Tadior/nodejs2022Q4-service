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
import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly service: TrackService) {}
  @UseGuards(jwtGuard)
  @Get()
  getAllTracks() {
    return this.service.getAll();
  }
  @UseGuards(jwtGuard)
  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.getById(id);
  }
  @UseGuards(jwtGuard)
  @Post()
  createTrack(@Body(WhitelistPipe) body: TrackDto) {
    return this.service.create(body);
  }
  @UseGuards(jwtGuard)
  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: IdDto,
    @Body(WhitelistPipe) body: TrackDto,
  ) {
    return this.service.update(id, body);
  }
  @UseGuards(jwtGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id);
  }
}
