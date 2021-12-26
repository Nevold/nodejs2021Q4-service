interface loggerLevelType {
  [key: string]: string;
}

const loggerLevel: loggerLevelType = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'fatal',
};

export const level = loggerLevel.info;
