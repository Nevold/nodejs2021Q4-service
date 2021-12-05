const {
  getAllTasks,
  getSingleTask,
  addTask,
  deleteTask,
  updateTask,
} = require('../boards/board.service');

const getTasksOptions = {
  handler: getAllTasks,
};

const getTaskOptions = {
  handler: getSingleTask,
};

const postTaskOptions = {
  handler: addTask,
};
const deleteTaskOptions = {
  handler: deleteTask,
};

const updateTaskOptions = {
  handler: updateTask,
};

function tasksRouter(fastify, options, next) {
  fastify.get('/boards/:boardId/tasks', getTasksOptions);
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOptions);
  fastify.post('/boards/:boardId/tasks', postTaskOptions);
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOptions);
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOptions);
  next();
}

module.exports = tasksRouter;
