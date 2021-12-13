import fastify, { FastifyPluginOptions } from 'fastify';
import swagger from 'fastify-swagger';
import { app } from './app';
import config from './common/config';

const server = fastify({ logger: true });

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
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
