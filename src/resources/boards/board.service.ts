import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { items } from '../db/db';
import { deleteBoardDependentTask } from '../tasks/tasks.service';

type CustomRequestBoard = FastifyRequest<{
  Params: { id: string; boardId: string; taskId: string };
  Body: {
    id: string;
    title: string;
    columns: Array<{ id: string; title: string; order: number }>;
  };
}>;

export const getAllBoards = (
  _: CustomRequestBoard,
  reply: FastifyReply
): void => {
  reply.send(items.board);
};

export const getSingleBoard = (
  request: CustomRequestBoard,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  const currentId = items.board?.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    const currentItem = items.board?.find((item) => item.id === id);
    reply.send(currentItem);
  }
};

export const addBoard = (
  request: CustomRequestBoard,
  reply: FastifyReply
): void => {
  const { title, columns } = request.body;
  const item = { id: uuidv4(), title, columns };
  if (items.board) {
    items.board = [...items.board, item];
  }
  reply.code(201).send(item);
};

export const deleteBoard = (
  request: CustomRequestBoard,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  const currentId = items.board?.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    items.board = items.board?.filter((item) => item.id !== id);
  }
  deleteBoardDependentTask(id);
  reply.code(200).send('Deleted');
};

export const updateBoard = (
  request: CustomRequestBoard,
  reply: FastifyReply
): void => {
  const { id } = request.params;
  const { title, columns } = request.body;

  items.board = items.board?.map((elem) =>
    elem.id === id ? { id, title, columns } : elem
  );
  const currentItem = items.board?.find((item) => item.id === id);
  reply.send(currentItem);
};
