import { FastifyInstance, RegisterOptions } from 'fastify';
import { Done } from '../../app';

import {
  getAllTasks,
  getSingleTask,
  addTask,
  deleteTask,
  updateTask,
} from './tasks.service';

// const ItemTask = {
//   type: 'object',
//   properties: {
//     id: { type: 'string' },
//     title: { type: 'string' },
//     order: { type: 'number' },
//     description: { type: 'string' },
//     boardId: { type: 'string' },
//     columnId: { type: 'string' },
//     userId: { type: 'string' },
//   },
// };

const getTasksOptions = {
  // method: 'GET',
  // schema: {
  //   response: {
  //     200: {
  //       type: 'array',
  //       items: ItemTask,
  //     },
  //   },
  // },
  handler: getAllTasks,
};

const getTaskOptions = {
  handler: getSingleTask,
};

const postTaskOptions = {
  handler: addTask,
};
const deleteTaskOptions = {
  handler: deleteTask,
};

const updateTaskOptions = {
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

// module.exports = tasksRouter;
