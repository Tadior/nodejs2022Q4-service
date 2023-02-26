import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

interface IFavoriteDto {
  name: string;
  year: number;
  artistId: string | null;
}

export class FavoriteDto implements IFavoriteDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsOptional()
  artistId: string | null;
}
