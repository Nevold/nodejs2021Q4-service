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
