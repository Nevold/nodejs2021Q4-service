import pino from 'pino';

export const logger = pino({
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
          ignore: 'pid,hostname,context,req.headers,res.headers',
        },
      },
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/info.logs.log',
          mkdir: true,
          colorize: false,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
          ignore: 'pid,hostname,context,req.headers,res.headers',
        },
      },
      {
        level: 'warn',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/warn.logs.log',
          colorize: false,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
          ignore: 'pid,hostname,context,req.headers,res.headers',
        },
      },
      {
        level: 'error',
        target: 'pino-pretty',
        options: {
          destination: './src/logs/error.logs.log',
          colorize: false,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
          ignore: 'pid,hostname,context,req.headers,res.headers',
        },
      },
    ],
  },
});
