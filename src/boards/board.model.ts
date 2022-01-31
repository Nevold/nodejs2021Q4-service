import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface IColumns {
  id: string;
  title: string;
  order: number;
}
@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column({ type: 'json', nullable: true })
  columns: IColumns[];
}
