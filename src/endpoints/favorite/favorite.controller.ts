import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { IdDto } from 'src/dto/id.dto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}
  @Get()
  getAllFavorites() {
    return this.service.getAllFavorites();
  }
  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.add(id, 'tracks');
  }
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id, 'tracks');
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.add(id, 'albums');
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id, 'albums');
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.add(id, 'artists');
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: IdDto) {
    return this.service.delete(id, 'artists');
  }
}
