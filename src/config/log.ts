import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/logger.log',
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
