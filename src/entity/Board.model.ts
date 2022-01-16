import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardColumn } from './Column.model';
// enum Columns { Array<{ id: string; title: string; order: number }>;}

// @Entity()
// export class Board {
//   @PrimaryGeneratedColumn('uuid')
//   id!: number;

//   @Column()
//   title!: string;

//   @Column()
//   columns!: string;
// }
@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.boardId)
  columns: BoardColumn[];
}
