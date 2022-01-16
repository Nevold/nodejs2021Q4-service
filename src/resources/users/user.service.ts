import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { items } from '../db/db';
import { deleteUserDependentTask } from '../tasks/tasks.service';
import { User } from '../../entity/User.model';
import { getRepository } from 'typeorm';

type CustomRequest = FastifyRequest<{
  Params: { id: string };
  Body: {
    name: string;
    login: string;
    password: string;
  };
}>;

/**
 **
 * Sends a response about all users.
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */

export const getAllItems = async (
  _: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const users = await getRepository(User).find();
  return reply.send(users);
};

/**
 **
 * Sends a response about specific user.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const getSingleItem = async (
  request: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;
  const currentUser = await getRepository(User).findOne(id);
  if (!currentUser) {
    reply.code(404).send('Not Found');
  }
  return reply.send(currentUser);
};

/**
 **
 * Sends a response about the added user.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const addSingleItem = async (
  request: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = await getRepository(User).save(request.body);
  reply.code(201).send(user);
};

/**
 **
 * Sends a response about the remote user.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const deleteSingleItem = async (
  request: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;
  deleteUserDependentTask(id);
  await getRepository(User).delete(id);
  reply.send('Deleted');
};

/**
 **
 * Sends a response about changed user information.
 * @param request -the `Request` object to be processed
 * @param  reply - the `Response` object to be processed.
 * @returns  Nothing is returned
 */
export const updateSingleItem = async (
  request: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;
  await getRepository(User).update(id, {
    ...request.body,
  });
  const userToUpdate = await getRepository(User).findOne(id);
  if (userToUpdate) reply.send(userToUpdate);
};
