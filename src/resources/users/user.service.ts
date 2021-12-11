import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';

type CustomRequest = FastifyRequest<{
  Params: { id: string };
  Body: {
    name: string;
    login: string;
    password: string;
  };
}>;

let items: Array<{ id: string }> = [];

export const getAllItems = (_: CustomRequest, reply: FastifyReply): void => {
  reply.send(items);
};

export const getSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  const currentItem = items.find((item) => item.id === id);

  reply.send(currentItem);
};

export const addSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { name, login, password } = request.body;
  const item = { id: uuidv4(), name, login, password };
  items = [...items, item];
  reply.code(201).send(item);
};

export const deleteSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  items = items.filter((item) => item.id !== id);
  reply.send('Deleted');
};

export const updateSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
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
