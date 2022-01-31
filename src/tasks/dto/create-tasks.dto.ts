import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  readonly columnId: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsInt()
  @IsNotEmpty()
  readonly order: number;
  readonly userId: string;
}
