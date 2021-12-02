// const router = require('express').Router();
// const User = require('./user.model');
// const usersService = require('./user.service');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

// module.exports = router;
const {
  getAllBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} = require('./board.service');
// Item schema
const ItemBoard = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    // password: { type: 'string' },
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

function boardRouter(fastify, options, next) {
  // Get all items
  fastify.get('/boards', getBoardsOptions);
  // Get single item
  fastify.get('/boards/:id', getBoardOptions);
  // create item
  fastify.post('/boards', postBoardOptions);
  // delete item
  fastify.delete('/boards/:id', deleteBoardOptions);
  // update
  fastify.put('/boards/:id', updateBoardOptions);
  next();
}

module.exports = boardRouter;
