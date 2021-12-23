import fastify, { FastifyPluginOptions } from 'fastify';
import pino from 'pino';
import swagger from 'fastify-swagger';
import { app } from './app';
import config from './common/config';

const logger = pino({
  // transport: {
  //   target: 'pino-pretty',
  //   options: {
  //     colorize: true,
  //   },
  // },
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      {
        level: 'warn',
        target: 'pino/file',
        options: { destination: './logs.txt' },
      },
    ],
  },
});

const server = fastify({ logger });

const handlerError = (error: unknown): void => {
  server.log.error(error);
  process.exit(1);
};

server.register<FastifyPluginOptions>(swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

server.register(app);

const start = async () => {
  try {
    await server.listen(config.PORT);

    // throw Error('Oops!');
  } catch (err) {
    // server.log.error(err);
    // process.exit(1);
    handlerError(err);
  }
};
start();
