import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User.model';

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
): Promise<User[]> => {
  const users = await getRepository(User).find();
  return users;
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
): Promise<User | undefined> => {
  const { id } = request.params;
  const currentUser = await getRepository(User).findOne(id);
  if (!currentUser) {
    reply.code(404).send('Not Found');
  }
  return currentUser;
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
  const { name, login, password } = request.body;
  const hash = await bcrypt.hash(password, 5);
  const newUser = {
    name,
    login,
    password: hash,
  };
  const user = await getRepository(User).save(newUser);
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
  await getRepository(User).delete(id);
  reply.send('DELETED');
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
