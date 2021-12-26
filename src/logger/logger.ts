import { FastifyRequest } from 'fastify';
import pino from 'pino';

export const logger = pino({
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/info.logs.log',
          colorize: false,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
      {
        level: 'warn',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/warn.logs.log',
          colorize: false,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
      {
        level: 'error',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/error.logs.log',
          colorize: false,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    ],
  },
  serializers: {
    req(request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        parameters: request.params,
        queryParams: request.query,
      };
    },
  },
});
