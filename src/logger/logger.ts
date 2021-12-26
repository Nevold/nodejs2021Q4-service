import { FastifyRequest } from 'fastify';
import pino from 'pino';
import { level } from './logger-level';

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
        level: 'debug',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/debug.logs.log',
          colorize: false,
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

// logger.on('level-change', (lvl, val, prevLvl, prevVal) => {
//   // if (logger !== this) {
//   //   return;
//   // }
//   console.log('%s (%d) was changed to %s (%d)', prevLvl, prevVal, lvl, val);
// });
logger.level = level;
