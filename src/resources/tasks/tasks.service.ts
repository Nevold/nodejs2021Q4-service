import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { items } from '../db/db';

type CustomRequestTask = FastifyRequest<{
  Params: { boardId: string; taskId: string };
  Body: {
    title: string;
    columnId: string;
    description: string;
    order: number;
    userId: string;
  };
}>;

export const getAllTasks = (
  request: CustomRequestTask,
  reply: FastifyReply
): void => {
  const { boardId: id } = request.params;

  const currentItem = items.task?.filter((item) => item.boardId === id);
  if (currentItem?.length === 0) {
    reply.code(404).send('Not Found');
  } else {
    reply.status(200);
    reply.send(currentItem);
  }
};
export const getSingleTask = (
  request: CustomRequestTask,
  reply: FastifyReply
): void => {
  const { taskId, boardId } = request.params;
  const currentItem = items.task?.filter(
    (item) => item.id === taskId && item.boardId === boardId
  )[0];

  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    reply.send(currentItem);
  }
};

export const addTask = (
  request: CustomRequestTask,
  reply: FastifyReply
): void => {
  const { title, columnId, description, order, userId } = request.body;
  const { boardId: id } = request.params;
  const newTask = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId,
  };
  if (items.task) {
    items.task = [...items.task, newTask];
  }

  reply.code(201).send(newTask);
};

export const deleteTask = (
  request: CustomRequestTask,
  reply: FastifyReply
): void => {
  const { taskId } = request.params;

  const currentItem = items.task?.find((item) => item.id === taskId);

  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    items.task = items.task?.filter((item) => item.id !== taskId);
    reply.send('Deleted');
  }
};

export const updateTask = (
  request: CustomRequestTask,
  reply: FastifyReply
): void => {
  const { title, order, description } = request.body;
  const { taskId } = request.params;
  const currentItem = items.task?.find((item) => item.id === taskId);
  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    items.task = items.task?.map((elem) =>
      elem.id === taskId ? { ...elem, title, order, description } : elem
    );
    const updateItem = items.task?.find((item) => item.id === taskId);
    reply.send(updateItem);
  }
};

export const deleteUserDependentTask = (userId: string): void => {
  if (items.task) {
    for (let i = 0; i < items.task.length; i++) {
      if (items.task[i].userId === userId) {
        items.task[i] = { ...items.task[i], userId: null };
      }
    }
  }
};

export const deleteBoardDependentTask = (boardId: string): void => {
  if (items.task) {
    for (let i = items.task.length - 1; i >= 0; i -= 1) {
      if (items.task[i].boardId === boardId) items.task.splice(i, 1);
    }
  }
};
