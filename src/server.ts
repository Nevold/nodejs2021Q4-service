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

const server = fastify({ logger });

// const handlerError = (error: unknown): void => {
//   server.log.error(error);
//   process.exit(1);
// };

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

// process.on('unhandledRejection', (err) => {
//   console.log(err);
// });

const start = async () => {
  try {
    await server.listen(config.PORT);

    // throw Error('Oops!');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
    // handlerError(err);
  }
};
start();
