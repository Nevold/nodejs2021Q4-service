import { IsNotEmpty, IsString } from 'class-validator';

export interface IColumns {
  id: string;
  title: string;
  order: number;
}

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly columns: IColumns[];
}
