import { FastifyInstance, RegisterOptions } from 'fastify';
import { Done } from '../../app';

import {
  getAllTasks,
  getSingleTask,
  addTask,
  deleteTask,
  updateTask,
} from './tasks.service';

const ItemTask = {
  id: { type: 'string' },
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: ['string', 'null'] },
  boardId: { type: ['string', 'null'] },
  columnId: { type: ['string', 'null'] },
};

const getTasksOptions = {
  method: 'GET',
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: ItemTask,
        },
      },
    },
  },
  handler: getAllTasks,
};

const getTaskOptions = {
  method: 'GET',
  schema: {
    response: {
      200: ItemTask,
    },
  },
  handler: getSingleTask,
};

const postTaskOptions = {
  method: 'POST',
  schema: {
    response: {
      201: ItemTask,
    },
  },
  handler: addTask,
};
const deleteTaskOptions = {
  method: 'DELETE',
  handler: deleteTask,
};

const updateTaskOptions = {
  method: 'PUT',
  schema: {
    response: {
      200: ItemTask,
    },
  },
  handler: updateTask,
};

export function tasksRouter(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: Done
): void {
  fastify.get('/boards/:boardId/tasks', getTasksOptions);
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOptions);
  fastify.post('/boards/:boardId/tasks', postTaskOptions);
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOptions);
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOptions);
  done();
}
