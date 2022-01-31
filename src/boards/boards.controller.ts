import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardsService.findBoardById(id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  createBoard(@Body() boardDto: CreateBoardDto) {
    return this.boardsService.createBoard(boardDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBoard(@Param('id') id: string): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateBoard(@Param('id') id: string, @Body() boardDto: CreateBoardDto) {
    return this.boardsService.updateBoard(id, boardDto);
  }
}
