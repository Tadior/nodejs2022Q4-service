import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthDbEntity {
  @PrimaryColumn()
  @IsString()
  id: string;
  @Column()
  @IsString()
  refreshToken: string;
}
