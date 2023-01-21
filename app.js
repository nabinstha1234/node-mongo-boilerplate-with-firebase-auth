const express = require('express');
const loaders = require('./loaders');

const logger = require('./utils/winstonLogger')();

const app = express();

process.on('unhandledRejection', (reason, promise) => {
  logger.error({ operation: 'unhandledRejection', message: reason, data: promise });
});

app.use('/v1', express.static(`${__dirname}/static`));
loaders({ app });

module.exports = app;
