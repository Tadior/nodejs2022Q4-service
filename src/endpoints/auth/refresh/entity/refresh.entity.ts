import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  refreshToken: string;
}
