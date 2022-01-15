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

// import { User } from './entity/User.model';
// import path from 'path';

// createConnection({
//   type: 'postgres',
//   host: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'postgres',
//   entities: ['src/entity/**/*.ts'],
//   // entities: [path.join(__dirname, '/**/*.model.ts')],
//   synchronize: true,
//   migrationsRun: true,
//   migrations: ['src/migration/**/*.ts'],
//   // subscribers: ['src/subscriber/**/*.ts'],
//   // cli: {
//   //   entitiesDir: 'src/entity',
//   //   migrationsDir: 'src/migration',
//   //   subscribersDir: 'src/subscriber',
//   // },
// })
createConnection()
  .then(async () => {
    // console.log('Inserting a new user into the database...');
    // const user = new User();
    // user.name = 'Timber';
    // user.login = 'Saw';
    // user.password = '25';
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);
    // console.log('Loading users from the database...');

    // const users = await connection.manager.find(User);
    // console.log('Loaded users: ', users);

    // console.log('Here you can setup and run express/koa/any other framework.');
    // ******************************************************

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
