const mongoose = require('mongoose');

const vars = require('../config/vars');
const logger = require('../utils/winstonLogger')('mongooseLoader');

module.exports = () => {
  const connection = vars.mongo.url;
  mongoose.Promise = global.Promise;
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once('open', () => {
      logger.info({
        operation: 'mongooseConnection',
        message: 'Database connected',
      });
    })
    .on('error', (err) => {
      logger.info({
        operation: 'mongooseConnection',
        message: 'Error Connecting to the database',
        data: err,
      });
    });
};
