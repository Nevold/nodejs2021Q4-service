import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.model';
import { Board } from './Board.model';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'boardId' })
  boardId: string | null;

  @Column({ nullable: true })
  columnId: string;
}
