import { IsBoolean, IsString } from 'class-validator';

interface IArtistDto {
  name: string;
  grammy: boolean;
}

export class ArtistDto implements IArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
