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
  getAllTasks,
  getSingleTask,
  addTask,
  deleteTask,
  updateTask,
} = require('../boards/board.service');
// Item schema
const ItemTasks = {
  // type: 'object',
  // properties: {
  //   id: { type: 'string' },
  //   title: { type: 'string' },
  //   columns: {
  // type: 'array',
  // properties: {
  //   type: 'object',
  //   properties: {
  //     title: { type: 'string' },
  //     order: { type: 'number' },
  //     id: { type: 'string' },
  //   },
  // },
  //   },
  // },
};

const getTasksOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: ItemTasks,
      },
    },
  },
  handler: getAllTasks,
};

const getTaskOptions = {
  // schema: {
  //   response: {
  //     200: ItemTasks,
  //   },
  // },
  handler: getSingleTask,
};

const postTaskOptions = {
  // schema: {
  //   response: {
  //     201: ItemTasks,
  //   },
  // },
  handler: addTask,
};
const deleteTaskOptions = {
  // schema: {
  //   response: {
  //     200: {
  //       type: 'object',
  //       properties: {
  //         message: { type: 'string' },
  //       },
  //     },
  //   },
  // },
  handler: deleteTask,
};

const updateTaskOptions = {
  schema: {
    response: {
      200: ItemTasks,
    },
  },
  handler: updateTask,
};

function tasksRouter(fastify, options, next) {
  // Get all items
  fastify.get('/boards/:boardId/tasks', getTasksOptions);
  // Get single item
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOptions);
  // create item
  fastify.post('/boards/:boardId/tasks', postTaskOptions);
  // delete item
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOptions);
  // update
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOptions);
  next();
}

module.exports = tasksRouter;
