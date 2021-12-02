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
const ItemUser = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    // password: { type: 'string' },
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

function userRouter(fastify, options, next) {
  // Get all items
  fastify.get('/users', getUsersOptions);
  // Get single item
  fastify.get('/users/:id', getUserOptions);
  // create item
  fastify.post('/users', postUserOptions);
  // delete item
  fastify.delete('/users/:id', deleteUserOptions);
  // update
  fastify.put('/users/:id', updateUserOptions);
  next();
}

module.exports = userRouter;
