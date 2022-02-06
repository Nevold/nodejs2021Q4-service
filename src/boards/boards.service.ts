import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findBoardById(id: string): Promise<Board> {
    const boardById = await this.boardsRepository.findOne({ where: { id } });
    if (!boardById) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return this.boardsRepository.findOne({ where: { id } });
  }

  async deleteBoard(id: string): Promise<void> {
    await this.boardsRepository.delete(id);
  }

  async createBoard(dto: CreateBoardDto) {
    const board = this.boardsRepository.save(dto);
    return board;
  }

  async updateBoard(id: string, dto: CreateBoardDto) {
    const board = this.boardsRepository.save({ id, ...dto });
    return board;
  }
}
