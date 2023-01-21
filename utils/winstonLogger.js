const winston = require('winston');
const colors = require('colors');
const util = require('util');
const isError = require('lodash/isError');
require('winston-daily-rotate-file');

const vars = require('../config/vars');

const { combine, timestamp, label, printf } = winston.format;

const rotateFileOptions = {
  level: vars.log.fileLogLevel,
  dirname: vars.log.dirname,
  filename: `.${vars.appName}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  handleExceptions: true,
  timestamp: true,
  format: winston.format.json(),
};

const logger = (name) => {
  const consoleFormatter = () => {
    let formatter = printf((info) => {
      return `${colors.grey(info.timestamp)} - ${info.name ? `${colors.magenta(info.name)} - ` : ''}${info.level}: ${
        info.message
      } ${
        info.data
          ? isError(info.data)
            ? `\n${colors.yellow(util.inspect(info.data, false, null, true))}`
            : `\n${colors.magenta(util.format('%o', info.data))}`
          : ''
      }`;
    });

    return combine(label({ label: 'label' }), timestamp(), formatter);
  };

  const getOptions = () => {
    let options = {};
    options.transports = [new winston.transports.Console()];
    if (vars.env !== 'production') {
      options.level = 'debug';
    } else {
      options.level = 'info';
    }

    if (vars.log.fileLogLevel && vars.log.dirname) {
      options.transports.push(
        new winston.transports.DailyRotateFile({
          ...rotateFileOptions,
          level: vars.log.logLevels.error,
          filename: `.${vars.log.errorLogFilename}-%DATE%.log`,
        }),
        new winston.transports.DailyRotateFile(rotateFileOptions)
      );
    }

    options.format = consoleFormatter();

    return options;
  };

  const loggerOptions = getOptions();
  const winstonLogger = winston.createLogger(loggerOptions);

  const log = (args) => {
    let logArgs = {
      ...args,
      name: `${name || ''}.${args.operation}()`,
    };

    winstonLogger.log(logArgs);
  };

  const error = (args = {}) => {
    log({
      level: 'error',
      ...args,
    });
  };

  const warn = (args) => {
    log({
      level: 'warn',
      ...args,
    });
  };

  const info = (args) => {
    log({
      level: 'info',
      ...args,
    });
  };

  const verbose = (args) => {
    log({
      level: 'verbose',
      ...args,
    });
  };

  const debug = (args) => {
    log({
      level: 'debug',
      ...args,
    });
  };

  const silly = (args) => {
    log({
      level: 'silly',
      ...args,
    });
  };

  return {
    info,
    error,
    verbose,
    warn,
    debug,
    silly,
  };
};

module.exports = logger;
