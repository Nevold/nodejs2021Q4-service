import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import { Task } from '../../entity/Task.model';

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
export const getAllTasks = async (
  request: CustomRequestTask,
  _: FastifyReply
): Promise<Task[]> => {
  const { boardId } = request.params;
  const tasks = await getRepository(Task).find({
    where: { boardId },
    loadRelationIds: true,
  });
  return tasks;
};

/**
 **
 * Sends a response about specific task.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const getSingleTask = async (
  request: CustomRequestTask,
  reply: FastifyReply
): Promise<Task | undefined> => {
  const { taskId, boardId } = request.params;
  const currentTask = await getRepository(Task).findOne(taskId, {
    where: { boardId },
    loadRelationIds: true,
  });
  if (!currentTask) {
    reply.code(404).send('NOT_FOUND');
  }
  return currentTask;
};

/**
 **
 * Sends a response about the added task.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const addTask = async (
  request: CustomRequestTask,
  reply: FastifyReply
): Promise<void> => {
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
  const task = await getRepository(Task).save(newTask);
  reply.code(201).send(task);
};

/**
 **
 * Sends a response about the remote task.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const deleteTask = async (
  request: CustomRequestTask,
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = request.params;
  await getRepository(Task).delete(taskId);
  reply.send('DELETED');
};

/**
 **
 * Sends a response about changed task information.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const updateTask = async (
  request: CustomRequestTask,
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = request.params;
  await getRepository(Task).update(taskId, {
    ...request.body,
  });
  const taskToUpdate = await getRepository(Task).findOne(taskId);

  if (taskToUpdate) reply.send(taskToUpdate);
};
