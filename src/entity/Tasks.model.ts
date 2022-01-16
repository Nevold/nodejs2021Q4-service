import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column()
  userId: string;

  @Column()
  boardId: string;

  @Column()
  columnId: string;
}
