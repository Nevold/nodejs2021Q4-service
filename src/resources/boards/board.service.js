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
  const currentItem = items.find((item) => item.id === id);

  reply.send(currentItem);
};

const addBoard = (request, reply) => {
  const { name, login, password } = request.body;
  const item = { name, login, password, id: uuidv4() };
  items = [...items, item];
  reply.code(201).send(item);
};

const deleteBoard = (request, reply) => {
  const { id } = request.params;
  items = items.filter((item) => item.id !== id);
  reply.send('Deleted');
};

const updateBoard = (request, reply) => {
  const { id } = request.params;
  const { name, login } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, name, login } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

module.exports = {
  getAllBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
