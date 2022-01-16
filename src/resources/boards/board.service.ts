import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { items } from '../db/db';
import { deleteBoardDependentTask } from '../tasks/tasks.service';
import { Board } from './../../entity/Board.model';

type CustomRequestBoard = FastifyRequest<{
  Params: { id: string; boardId: string; taskId: string };
  Body: {
    id: string;
    title: string;
    columns: Array<{ id: string; title: string; order: number }>;
  };
}>;

/**
 **
 * Sends a response about all boards.
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const getAllBoards = async (
  _: CustomRequestBoard,
  reply: FastifyReply
): Promise<void> => {
  const boards = await getRepository(Board).find({ relations: ['columns'] });
  return reply.send(boards);
};

/**
 **
 * Sends a response about specific board.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const getSingleBoard = async (
  request: CustomRequestBoard,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;
  const currentBoard = await getRepository(Board).findOne(id, {
    relations: ['columns'],
  });
  if (!currentBoard) {
    reply.code(404).send('Not Found');
  }
  return reply.send(currentBoard);
};

/**
 **
 * Sends a response about the added board.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const addBoard = async (
  request: CustomRequestBoard,
  reply: FastifyReply
): Promise<void> => {
  const board = await getRepository(Board).save(request.body);
  reply.code(201).send(board);
};

/**
 **
 * Sends a response about the remote board.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const deleteBoard = async (
  request: CustomRequestBoard,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;
  deleteBoardDependentTask(id);
  await getRepository(Board).delete(id);
  reply.send('Deleted');
};

/**
 **
 * Sends a response about changed board information.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const updateBoard = async (
  request: CustomRequestBoard,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;

  await getRepository(Board).update(id, {
    ...request.body,
  });
  const boardToUpdate = await getRepository(Board).findOne(id);

  if (boardToUpdate) reply.send(boardToUpdate);
};
