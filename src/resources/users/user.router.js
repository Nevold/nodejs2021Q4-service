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
  getAllItems,
  getSingleItem,
  addSingleItem,
  deleteSingleItem,
  updateSingleItem,
} = require('./user.service');
// Item schema
const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    // password: { type: 'string' },
  },
};

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getAllItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getSingleItem,
};

const postItemOpts = {
  schema: {
    response: {
      201: Item,
    },
  },
  handler: addSingleItem,
};
const deleteItemOpts = {
  handler: deleteSingleItem,
};

const updateItemOpts = {
  handler: updateSingleItem,
};

function userRouter(fastify, options, next) {
  // Get all items
  fastify.get('/users', getItemsOpts);
  // Get single item
  fastify.get('/users/:id', getItemOpts);
  // create item
  fastify.post('/users', postItemOpts);
  // delete item
  fastify.delete('/users/:id', deleteItemOpts);
  // update
  fastify.put('/users/:id', updateItemOpts);
  next();
}

module.exports = userRouter;
