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

module.exports = {
  getAllBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
