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
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    return this.tasksService.findAll(boardId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get(':boardId/tasks/:taskId')
  findTaskById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ): Promise<Task> {
    return this.tasksService.findTaskById(boardId, taskId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post(':boardId/tasks')
  createTask(
    @Param('boardId') boardId: string,
    @Body() taskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(boardId, taskDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Delete(':boardId/tasks/:taskId')
  deleteTask(@Param('taskId') taskId: string): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put(':boardId/tasks/:taskId')
  updateTask(@Param('taskId') taskId: string, @Body() taskDto: CreateTaskDto) {
    return this.tasksService.updateTask(taskId, taskDto);
  }
}
