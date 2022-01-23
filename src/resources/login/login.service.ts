import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import config from '../../common/config';
import { User } from '../../entity/User.model';

type CustomRequest = FastifyRequest<{
  Params: { id: string };
  Body: {
    name: string;
    login: string;
    password: string;
  };
}>;

export const getUserProps = async (
  login: string
): Promise<User | undefined> => {
  const users = await getRepository(User).find();
  const currentUser = users.find((user) => user.login === login);
  return currentUser;
};

export const signToken = async (userLogin: string): Promise<string | null> => {
  const user = await getUserProps(userLogin);
  if (!user) return null;
  const { login, password } = user;
  return jwt.sign({ login, password }, config.JWT_SECRET_KEY);
};

export const addLoginInfo = async (
  request: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const { login } = request.body;
  const token = await signToken(login);
  if (!token) {
    reply.code(403).send('Forbidden');
  } else {
    reply.code(200).send(token);
  }
};
