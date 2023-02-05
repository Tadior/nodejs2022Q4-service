import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

interface ITrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackDto implements ITrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId: string | null;
  @IsOptional()
  @IsUUID()
  albumId: string | null;
  @IsNumber()
  duration: number;
}
