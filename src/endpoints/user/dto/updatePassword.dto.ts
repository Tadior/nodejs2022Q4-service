import { IsString } from 'class-validator';

interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
