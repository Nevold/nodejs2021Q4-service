import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { items } from '../db/db';
import { deleteUserDependentTask } from '../tasks/tasks.service';

type CustomRequest = FastifyRequest<{
  Params: { id: string };
  Body: {
    name: string;
    login: string;
    password: string;
  };
}>;

export const getAllItems = (_: CustomRequest, reply: FastifyReply): void => {
  reply.send(items.user);
};

export const getSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  const currentItem = items.user?.find((item) => item.id === id);
  if (!currentItem) {
    reply.code(404).send('Not Found');
  }

  reply.send(currentItem);
};

export const addSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { name, login, password } = request.body;
  const item = { id: uuidv4(), name, login, password };
  if (items.user) {
    items.user = [...items.user, item];
    reply.code(201).send(item);
  }
};

export const deleteSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  items.user = items.user?.filter((item) => item.id !== id);
  deleteUserDependentTask(id);
  reply.send('Deleted');
};

export const updateSingleItem = (
  request: CustomRequest,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  const { name, login, password } = request.body;
  items.user = items.user?.map((elem) =>
    elem.id === id ? { id, name, login, password } : elem
  );
  const currentItem = items.user?.find((item) => item.id === id);
  reply.send(currentItem);
};
