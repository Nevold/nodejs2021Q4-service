import fastify, {
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import swagger from 'fastify-swagger';
import { app } from './app';
import config from './common/config';
import { logger } from './logger/logger';
import { level } from './logger/logger-level';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import path from 'path';

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
})
  .then(async () => {
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

    server.register(app);

    const start = async () => {
      try {
        await server.listen(
          config.PORT,
          config.HTTP_ADDRESS || config.HTTP_ADDRESS_DEFAULT
        );
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    };
    start();
  })
  .catch((error) => console.log(error));
