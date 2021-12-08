import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';

type FastifyRequest = {
  params: { id: string };
  body: {
    name: string;
    login: string;
    password: string;
  };
};

let items: Array<{ id: string }> = [];

export const getAllItems = (_: FastifyRequest, reply: FastifyReply): void => {
  reply.send(items);
};

export const getSingleItem = (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params;
  const currentItem = items.find((item) => item.id === id);

  reply.send(currentItem);
};

export const addSingleItem = (request: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password } = request.body;
  const item = { id: uuidv4(), name, login, password };
  items = [...items, item];
  reply.code(201).send(item);
};

export const deleteSingleItem = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params;
  items = items.filter((item) => item.id !== id);
  reply.send('Deleted');
};

export const updateSingleItem = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { name, login } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, name, login } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

// module.exports = {
//   getAllItems,
//   getSingleItem,
//   addSingleItem,
//   deleteSingleItem,
//   updateSingleItem,
// };
