import fastify, {
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import swagger from 'fastify-swagger';
import { createConnection } from 'typeorm';
import path from 'path';
import 'reflect-metadata';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { app } from './app';
import config from './common/config';
import { logger } from './logger/logger';
import { level } from './logger/logger-level';

logger.level = level;
const server = fastify({ logger });

process.on('uncaughtException', (err: Error) => {
  // eslint-disable-next-line no-console
  console.log(err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  // eslint-disable-next-line no-console
  console.log(err.message);
  process.exit(1);
});

server.register<FastifyPluginOptions>(swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

server.addHook(
  'preHandler',
  (
    req: FastifyRequest,
    _: FastifyReply,
    done: HookHandlerDoneFunction
  ): void => {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body');
    }
    done();
  }
);

server.addHook(
  'preHandler',
  (req: FastifyRequest, reply: FastifyReply, next): void => {
    const isUsers = req.url.split('/')[1] === 'users';
    const isBoards = req.url.split('/')[1] === 'boards';
    const isTasks = req.url.split('/')[3] === 'tasks';
    const auth = req.headers.authorization;
    if (auth === undefined && (isUsers || isBoards || isTasks)) {
      reply.code(401).send('Unauthorized');
      return;
    }
    if (auth !== undefined) {
      const [type, token] = auth.split(' ');
      if (type !== 'Bearer' || !token) {
        reply.code(401).send('Unauthorized');
        return;
      }
      jwt.verify(token, config.JWT_SECRET_KEY);

      next();
    }
    next();
  }
);

server.register(app);

createConnection({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: +config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [path.join(__dirname, '/**/*.model.ts')],
  synchronize: true,
  migrationsRun: true,
  migrations: [path.join(__dirname, '/migrations/**/*.ts')],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/migrations',
  },
})
  .then(async () => {
    server.listen(
      config.PORT,
      config.HTTP_ADDRESS || config.HTTP_ADDRESS_DEFAULT,
      (err: Error | null): void => {
        if (err) throw new Error(err.message);
      }
    );
  })
  .catch((err: Error) => {
    server.log.error(err);
    process.exit(1);
  });
