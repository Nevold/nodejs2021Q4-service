// const usersRepo = require('./user.memory.repository');

// const getAll = () => usersRepo.getAll();

// module.exports = { getAll };
const { v4: uuidv4 } = require('uuid');
let items = require('./board.memory.repository');

const getAllBoards = (_, reply) => {
  reply.send(items);
};

const getSingleBoard = (request, reply) => {
  const { id } = request.params;
  const currentId = items.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    const currentItem = items.find((item) => item.id === id);
    reply.send(currentItem);
  }
};

const addBoard = (request, reply) => {
  const { title, columns } = request.body;
  // columns.forEach((column) => (column.id = uuidv4()));
  for (let i = 0; i < columns.length; i += 1) {
    columns[i].id = uuidv4();
  }
  const item = { id: uuidv4(), title, columns };
  items = [...items, item];
  reply.code(201).send(item);
};

const deleteBoard = (request, reply) => {
  const { id } = request.params;
  const currentId = items.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    items = items.filter((item) => item.id !== id);
    reply.code(200).send('Deleted');
  }
  // reply.send(currentId);
};

const updateBoard = (request, reply) => {
  const { id } = request.params;
  const { title, columns } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, title, columns } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

// ________________________________________

const getAllTasks = (request, reply) => {
  const { boardId: id } = request.params;
  const currentId = items.filter((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    const currentItem = items.filter((item) => item.id === id);
    reply.send(currentItem);
  }
};

const getSingleTask = (request, reply) => {
  const { boardId, taskId } = request.params;
  const currentItem = items.find((item) => item.id === boardId);
  const currentTask = currentItem.columns.filter((item) => item.id === taskId);
  reply.code(200).send(currentTask);
  // if (!currentTask) {
  //   reply.code(404).send('Not Found');
  // } else {
  //   reply.send(currentTask);
  // }
};

const addTask = (request, reply) => {
  const { title, columnId, description, order, userId } = request.body;
  const item = {
    boardId: uuidv4(),
    columnId,
    description,
    order,
    title,
    userId,
  };
  items = [...items, item];
  reply.code(201).send(item);
};

const deleteTask = (request, reply) => {
  const { id } = request.params;
  const currentId = items.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    items = items.filter((item) => item.id !== id);
    reply.code(200).send('Deleted');
  }
  // reply.send(currentId);
};

const updateTask = (request, reply) => {
  const { id } = request.params;
  const { title, columns } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, title, columns } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

module.exports = {
  getAllBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  getAllTasks,
  getSingleTask,
  addTask,
  deleteTask,
  updateTask,
};
