import { FastifyInstance, RegisterOptions } from 'fastify';

import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { tasksRouter } from './resources/tasks/tasks.router';
import { loginRouter } from './resources/login/login.router';

export type Done = () => void;

/**
 **
 * Declare a routes.
 * @param fastify - Require the framework
 * @param done - the function to continue with the lifecycle
 * @returns  Nothing is returned
 */
export async function app(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: Done
) {
  await userRouter(fastify, _, done);
  await boardRouter(fastify, _, done);
  await tasksRouter(fastify, _, done);
  await loginRouter(fastify, _, done);
}
