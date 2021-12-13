import { FastifyInstance, RegisterOptions } from 'fastify';
import { Done } from '../../app';
import {
  getAllItems,
  getSingleItem,
  addSingleItem,
  deleteSingleItem,
  updateSingleItem,
} from './user.service';

const ItemUser = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getUsersOptions = {
  method: 'GET',
  schema: {
    response: {
      200: {
        type: 'array',
        items: ItemUser,
      },
    },
  },
  handler: getAllItems,
};

const getUserOptions = {
  method: 'GET',
  schema: {
    response: {
      200: ItemUser,
    },
  },
  handler: getSingleItem,
};

const postUserOptions = {
  method: 'POST',
  schema: {
    response: {
      201: ItemUser,
    },
  },
  handler: addSingleItem,
};
const deleteUserOptions = {
  method: 'DELETE',
  handler: deleteSingleItem,
};

const updateUserOptions = {
  schema: {
    response: {
      200: ItemUser,
    },
  },
  handler: updateSingleItem,
};

export function userRouter(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: Done
): void {
  fastify.get('/users', getUsersOptions);
  fastify.get('/users/:id', getUserOptions);
  fastify.post('/users', postUserOptions);
  fastify.delete('/users/:id', deleteUserOptions);
  fastify.put('/users/:id', updateUserOptions);
  done();
}
