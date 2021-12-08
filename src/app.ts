// const userRouter = require('./resources/users/user.router');
// const boardRouter = require('./resources/boards/board.router');
// const tasksRouter = require('./resources/tasks/tasks.router');

import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { tasksRouter } from './resources/tasks/tasks.router';

export function app(fastify: any, options: any, next: any) {
  userRouter(fastify, options, next);
  boardRouter(fastify, options, next);
  tasksRouter(fastify, options, next);
}

// module.exports = app;
