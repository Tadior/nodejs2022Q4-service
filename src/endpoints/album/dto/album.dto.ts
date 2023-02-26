import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

interface IAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumDto implements IAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
