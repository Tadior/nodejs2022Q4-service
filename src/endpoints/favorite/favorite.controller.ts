import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { IdDto } from 'src/dto/id.dto';
import { jwtGuard } from 'src/guards/jwt.guard';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}
  @UseGuards(jwtGuard)
  @Get()
  getAllFavorites() {
    return this.service.getAllFavorites();
  }
  @UseGuards(jwtGuard)
  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.add(id, 'tracks');
  }
  @UseGuards(jwtGuard)
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id, 'tracks');
  }
  @UseGuards(jwtGuard)
  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.add(id, 'albums');
  }
  @UseGuards(jwtGuard)
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id, 'albums');
  }
  @UseGuards(jwtGuard)
  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.add(id, 'artists');
  }
  @UseGuards(jwtGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id, 'artists');
  }
}
