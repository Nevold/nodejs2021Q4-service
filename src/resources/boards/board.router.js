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
  getAllItems1,
  getSingleItem1,
  addSingleItem1,
  deleteSingleItem1,
  updateSingleItem1,
} = require('./board.service');
// Item schema
const Item1 = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    // password: { type: 'string' },
  },
};

const getItemsOpts1 = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item1,
      },
    },
  },
  handler: getAllItems1,
};

const getItemOpts1 = {
  schema: {
    response: {
      200: Item1,
    },
  },
  handler: getSingleItem1,
};

const postItemOpts1 = {
  schema: {
    response: {
      201: Item1,
    },
  },
  handler: addSingleItem1,
};
const deleteItemOpts1 = {
  handler: deleteSingleItem1,
};

const updateItemOpts1 = {
  handler: updateSingleItem1,
};

function boardRouter(fastify, options, next) {
  // Get all items
  fastify.get('/boards', getItemsOpts1);
  // Get single item
  fastify.get('/boards/:id', getItemOpts1);
  // create item
  fastify.post('/boards', postItemOpts1);
  // delete item
  fastify.delete('/boards/:id', deleteItemOpts1);
  // update
  fastify.put('/boards/:id', updateItemOpts1);
  next();
}

module.exports = boardRouter;
