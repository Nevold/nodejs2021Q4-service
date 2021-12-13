import { FastifyInstance, RegisterOptions } from 'fastify';

import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { tasksRouter } from './resources/tasks/tasks.router';

export type Done = () => void;

export function app(
  fastify: FastifyInstance,
  options: RegisterOptions,
  done: Done
) {
  userRouter(fastify, options, done);
  boardRouter(fastify, options, done);
  tasksRouter(fastify, options, done);
}
