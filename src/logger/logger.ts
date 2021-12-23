import pino from 'pino';
// import pretty from'pino-pretty'
// import fs from 'fs';

// const streams = [
//     {stream: fs.createWriteStream('/tmp/info.stream.out')},
//     {level: 'debug', stream: fs.createWriteStream('/tmp/debug.stream.out')},
//     {level: 'fatal', stream: fs.createWriteStream('/tmp/fatal.stream.out')}
//   ]
// type CustomRequest = FastifyRequest<{
//   Params: { id: string };
//   Body: {
//     name: string;
//     login: string;
//     password: string;
//   };
// }>;

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
        target: 'pino/file',
        options: { destination: './debug.logs.txt' },
      },
      {
        level: 'info',
        target: 'pino/file',
        options: { destination: './info.logs.txt' },
      },
      {
        level: 'warn',
        target: 'pino/file',
        options: { destination: './warn.logs.txt' },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: './error.logs.txt' },
      },
      {
        level: 'fatal',
        target: 'pino/file',
        options: { destination: './fatal.logs.txt' },
      },
    ],
  },
});
