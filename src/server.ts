// const fastify = require('fastify')({ logger: true });
import fastify, { FastifyPluginOptions } from 'fastify';
import swagger from 'fastify-swagger';
import { app } from './app';

const server = fastify({ logger: true });

const { PORT } = require('./common/config');

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
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
