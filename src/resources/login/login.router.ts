import { FastifyInstance, RegisterOptions } from 'fastify';
import { Done } from '../../app';
import { addLoginInfo } from './login.service';

const ItemLogin = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const postLoginOptions = {
  method: 'POST',
  schema: {
    response: {
      201: ItemLogin,
    },
  },
  handler: addLoginInfo,
};

export async function loginRouter(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: Done
): Promise<void> {
  fastify.post('/login', postLoginOptions);
  done();
}
