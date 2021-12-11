import { FastifyInstance, RegisterOptions } from 'fastify';
import { Done } from '../../app';

// const {
//   getAllBoards,
//   getSingleBoard,
//   addBoard,
//   deleteBoard,
//   updateBoard,
// } = require('./board.service');

import {
  getAllBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} from './board.service';

const ItemBoard = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
      },
    },
  },
};

const getBoardsOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: ItemBoard,
      },
    },
  },
  handler: getAllBoards,
};

const getBoardOptions = {
  schema: {
    response: {
      200: ItemBoard,
    },
  },
  handler: getSingleBoard,
};

const postBoardOptions = {
  schema: {
    response: {
      201: ItemBoard,
    },
  },
  handler: addBoard,
};
const deleteBoardOptions = {
  handler: deleteBoard,
};

const updateBoardOptions = {
  schema: {
    response: {
      200: ItemBoard,
    },
  },
  handler: updateBoard,
};

export function boardRouter(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: Done
): void {
  fastify.get('/boards', getBoardsOptions);
  fastify.get('/boards/:id', getBoardOptions);
  fastify.post('/boards', postBoardOptions);
  fastify.delete('/boards/:id', deleteBoardOptions);
  fastify.put('/boards/:id', updateBoardOptions);
  done();
}

// module.exports = boardRouter;
