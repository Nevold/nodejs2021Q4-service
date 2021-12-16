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

/**
 **
 * Sends a response about all tasks.
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
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

/**
 **
 * Sends a response about specific task.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
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

/**
 **
 * Sends a response about the added task.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
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

/**
 **
 * Sends a response about the remote task.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
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

/**
 **
 * Sends a response about changed task information.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
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

/**
 **
 * Iteration over the array with the subsequent removal of the required value.
 * @param userId -the string on which the comparison is performed
 * @returns  Nothing is returned
 */
export const deleteUserDependentTask = (userId: string): void => {
  if (items.task) {
    for (let i = 0; i < items.task.length; i++) {
      if (items.task[i].userId === userId) {
        items.task[i] = { ...items.task[i], userId: null };
      }
    }
  }
};

/**
 **
 * Iteration over the array with the subsequent removal of the required value.
 * @param userId -the string on which the comparison is performed
 * @returns  Nothing is returned
 */
export const deleteBoardDependentTask = (boardId: string): void => {
  if (items.task) {
    for (let i = items.task.length - 1; i >= 0; i -= 1) {
      if (items.task[i].boardId === boardId) items.task.splice(i, 1);
    }
  }
};
