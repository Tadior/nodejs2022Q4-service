import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  version: number;
  @CreateDateColumn()
  createdAt: number;
  @UpdateDateColumn()
  updatedAt: number;
}
