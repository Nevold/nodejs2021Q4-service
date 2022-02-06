import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { boardId },
      loadRelationIds: true,
    });
  }

  async findTaskById(boardId: string, taskId: string): Promise<Task> {
    const taskById = await this.tasksRepository.findOne(taskId, {
      where: { boardId },
      loadRelationIds: true,
    });
    if (!taskById) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return this.tasksRepository.findOne(taskId, {
      where: { boardId },
      loadRelationIds: true,
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.tasksRepository.delete(taskId);
  }

  async createTask(boardId: string, dto: CreateTaskDto) {
    const { title, columnId, description, order, userId } = dto;
    const newTask = {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
    const task = this.tasksRepository.save(newTask);
    return task;
  }

  async updateTask(taskId: string, dto: CreateTaskDto) {
    const task = this.tasksRepository.save({ taskId, ...dto });
    return task;
  }
}
