const { v4: uuidv4 } = require('uuid');
let items = require('./user.memory.repository');

const getAllItems = (_, reply) => {
  reply.send(items);
};

const getSingleItem = (request, reply) => {
  const { id } = request.params;
  const currentItem = items.find((item) => item.id === id);

  reply.send(currentItem);
};

const addSingleItem = (request, reply) => {
  const { name, login, password } = request.body;
  const item = { id: uuidv4(), name, login, password };
  items = [...items, item];
  reply.code(201).send(item);
};

const deleteSingleItem = (request, reply) => {
  const { id } = request.params;
  items = items.filter((item) => item.id !== id);
  reply.send('Deleted');
};

const updateSingleItem = (request, reply) => {
  const { id } = request.params;
  const { name, login } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, name, login } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

module.exports = {
  getAllItems,
  getSingleItem,
  addSingleItem,
  deleteSingleItem,
  updateSingleItem,
};
