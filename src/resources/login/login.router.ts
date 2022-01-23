import { FastifyInstance, RegisterOptions } from 'fastify';
import { Done } from '../../app';
import {
  // getAllItems,
  // getSingleItem,
  addLoginInfo,
  // deleteSingleItem,
  // updateSingleItem,
} from './login.service';

const ItemLogin = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

// const getUsersOptions = {
//   method: 'GET',
//   schema: {
//     response: {
//       200: {
//         type: 'array',
//         items: ItemLogin,
//       },
//     },
//   },
//   handler: getAllItems,
// };

// const getUserOptions = {
//   method: 'GET',
//   schema: {
//     response: {
//       200: ItemUser,
//     },
//   },
//   handler: getSingleItem,
// };

const postLoginOptions = {
  method: 'POST',
  schema: {
    response: {
      201: ItemLogin,
    },
  },
  handler: addLoginInfo,
};
// const deleteUserOptions = {
//   method: 'DELETE',
//   handler: deleteSingleItem,
// };

// const updateUserOptions = {
//   schema: {
//     response: {
//       200: ItemUser,
//     },
//   },
//   handler: updateSingleItem,
// };

/**
 **
 * Declare a route.
 * @param fastify - Require the framework
 * @param done - the function to continue with the lifecycle
 * @returns  Nothing is returned
 */
export async function loginRouter(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: Done
): Promise<void> {
  // fastify.get('/login', getUsersOptions);
  // fastify.get('/users/:id', getUserOptions);
  fastify.post('/login', postLoginOptions);
  // fastify.delete('/users/:id', deleteUserOptions);
  // fastify.put('/users/:id', updateUserOptions);
  done();
}
