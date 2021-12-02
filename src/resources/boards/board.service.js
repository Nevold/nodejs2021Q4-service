// const usersRepo = require('./user.memory.repository');

// const getAll = () => usersRepo.getAll();

// module.exports = { getAll };
const { v4: uuidv4 } = require('uuid');
let items = require('./board.memory.repository');

const getAllItems1 = (_, reply) => {
  reply.send(items);
};

const getSingleItem1 = (request, reply) => {
  const { id } = request.params;
  const currentItem = items.find((item) => item.id === id);

  reply.send(currentItem);
};

const addSingleItem1 = (request, reply) => {
  const { name, login, password } = request.body;
  const item = { name, login, password, id: uuidv4() };
  items = [...items, item];
  reply.code(201).send(item);
};

const deleteSingleItem1 = (request, reply) => {
  const { id } = request.params;
  items = items.filter((item) => item.id !== id);
  reply.send('Deleted');
};

const updateSingleItem1 = (request, reply) => {
  const { id } = request.params;
  const { name, login } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, name, login } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

module.exports = {
  getAllItems1,
  getSingleItem1,
  addSingleItem1,
  deleteSingleItem1,
  updateSingleItem1,
};
