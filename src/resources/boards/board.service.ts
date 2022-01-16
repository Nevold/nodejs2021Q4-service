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
  // reply.send(items.board);
  const boards = await getRepository(Board).find();

  // console.log(users);
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
  // const { id } = request.params;
  // const currentId = items.board?.find((item) => item.id === id);
  // if (!currentId) {
  //   reply.code(404).send('Not Found');
  // } else {
  //   const currentItem = items.board?.find((item) => item.id === id);
  //   reply.send(currentItem);
  // }
  const { id } = request.params;
  const currentBoard = await getRepository(Board).findOne(id);
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
  // const { title, columns } = request.body;
  // const item = { id: uuidv4(), title, columns };
  // if (items.board) {
  //   items.board = [...items.board, item];
  // }
  // reply.code(201).send(item);
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
  // const { id } = request.params;
  // const currentId = items.board?.find((item) => item.id === id);
  // if (!currentId) {
  //   reply.code(404).send('Not Found');
  // } else {
  //   items.board = items.board?.filter((item) => item.id !== id);
  // }
  // deleteBoardDependentTask(id);
  // reply.code(200).send('Deleted');
  const { id } = request.params;
  // items.user = items.user?.filter((item) => item.id !== id);
  // deleteUserDependentTask(id);
  // reply.send('Deleted');
  // const userToRemove = await getRepository(User).findOne(id);
  // if (userToRemove) await getRepository(User).remove(userToRemove);
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
  // const { title, columns } = request.body;

  // items.board = items.board?.map((elem) =>
  //   elem.id === id ? { id, title, columns } : elem
  // );
  // const currentItem = items.board?.find((item) => item.id === id);
  // reply.send(currentItem);

  await getRepository(Board).update(id, {
    ...request.body,
  });
  const boardToUpdate = await getRepository(Board).findOne(id);
  if (boardToUpdate) reply.send(boardToUpdate);
};
