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

// /**
//  **
//  * Send a response.
//  * @param reply - the `Request` object to be processed.
//  * @returns a `Response` object containing the data.
//  */

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

  // console.log(users);
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
  // const currentUser = getRepository(User).findByIds([id]);
  const currentUser = await getRepository(User).findOne(id);
  // const { id } = request.params;
  // const currentItem = items.user?.find((item) => item.id === id);
  if (!currentUser) {
    reply.code(404).send('Not Found');
  }
  // reply.send(currentItem);
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
  // const { name, login, password } = request.body;
  // const item = { name, login, password };
  const user = await getRepository(User).save(request.body);

  // if (items.user) {
  //   items.user = [...items.user, item];
  reply.code(201).send(user);
  // }
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
  // items.user = items.user?.filter((item) => item.id !== id);
  // deleteUserDependentTask(id);
  // reply.send('Deleted');
  // const userToRemove = await getRepository(User).findOne(id);
  // if (userToRemove) await getRepository(User).remove(userToRemove);
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
  // const { name, login, password } = request.body;
  // items.user = items.user?.map((elem) =>
  //   elem.id === id ? { id, name, login, password } : elem
  // );
  // const currentItem = items.user?.find((item) => item.id === id);
  // reply.send(currentItem);

  // let userToUpdate = await getRepository(User).findOne(id);
  // photoToUpdate.name = "Me, my friends and polar bears";
  // if (userToUpdate) userToUpdate = {userToUpdate.id, ...request.body };
  // await getRepository(User).save(userToUpdate);
  await getRepository(User).update(id, {
    ...request.body,
  });
  const userToUpdate = await getRepository(User).findOne(id);
  if (userToUpdate) reply.send(userToUpdate);
};
