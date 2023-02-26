import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

interface ICreateUserDto {
  login: string;
  password: string;
}

@Entity('createUser')
export class CreateUserDto implements ICreateUserDto {
  @PrimaryColumn()
  @IsString()
  login: string;
  @Column()
  @IsString()
  password: string;
}
