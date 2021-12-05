const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/tasks.router');

function app(fastify, options, next) {
  userRouter(fastify, options, next);
  boardRouter(fastify, options, next);
  tasksRouter(fastify, options, next);
}

module.exports = app;
