import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
  login: string,
  password: string
): Promise<User | undefined> => {
  const users = await getRepository(User).find();
  const currentUser = users.find(
    (user) =>
      user.login === login && bcrypt.compareSync(password, user.password)
  );
  return currentUser;
};

export const signToken = async (
  userLogin: string,
  userPassword: string
): Promise<string | null> => {
  const user = await getUserProps(userLogin, userPassword);
  if (!user) return null;
  const { login, id } = user;
  return jwt.sign({ login, id }, config.JWT_SECRET_KEY);
};

export const addLoginInfo = async (
  request: CustomRequest,
  reply: FastifyReply
): Promise<void> => {
  const { login, password } = request.body;
  const token = await signToken(login, password);
  if (!token) {
    reply.code(403).send('Forbidden');
  } else {
    reply.code(200).send(token);
  }
};
