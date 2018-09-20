const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, json } = format;
const winston = require('winston');

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

const myFormat = printf(info => {
  return `{'timeStamp': '${info.timestamp}', 'label': '[${info.label}]', 'level': '${info.level}', 'message': '${info.message}'}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({ 
        filename: 'error.log',
        level: 'info',
        levels: config.levels,
        format: combine(
            colorize(),
            label({ label: 'my-label' }),
            timestamp(),
            // json()
            myFormat
        ),
    }),
    new winston.transports.File({ 
        filename: 'error.log',
        level: 'info',
        levels: config.levels,
        format: combine(
            // colorize(),
            label({ label: 'my-label' }),
            timestamp(),
            // json()
            myFormat
        ),
    })
  ],
//   level: 'info'
});

logger.info("Hello");