'use strict';

const winston = require('winston');
const path = require('path');
const filename = path.join(__dirname, 'created-logfile.log');
//
// Logging levels
//
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

winston.addColors(config.colors);

const logger = module.exports = winston.createLogger({
  levels: config.levels,
//   format: winston.format.json(),
  format: winston.format.combine(
    winston.format.colorize(),
    // winston.format.simple(),
    winston.format.label({ label: 'my-label' }),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'info' })
  ],
  level: 'custom'
});

logger.info('hello')