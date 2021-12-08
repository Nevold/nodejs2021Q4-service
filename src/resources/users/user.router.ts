// const {
//   getAllItems,
//   getSingleItem,
//   addSingleItem,
//   deleteSingleItem,
//   updateSingleItem,
// } = require('./user.service');

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
  schema: {
    response: {
      200: ItemUser,
    },
  },
  handler: getSingleItem,
};

const postUserOptions = {
  schema: {
    response: {
      201: ItemUser,
    },
  },
  handler: addSingleItem,
};
const deleteUserOptions = {
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

export function userRouter(fastify: any, options: any, next: any) {
  fastify.get('/users', getUsersOptions);
  fastify.get('/users/:id', getUserOptions);
  fastify.post('/users', postUserOptions);
  fastify.delete('/users/:id', deleteUserOptions);
  fastify.put('/users/:id', updateUserOptions);
  next();
}
