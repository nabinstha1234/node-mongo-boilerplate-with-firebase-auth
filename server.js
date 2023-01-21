const app = require('./app');
const vars = require('./config/vars');

const logger = require('./utils/winstonLogger')('server');

app.listen(vars.port, () => {
  logger.info({
    operation: 'serverConnection',
    message: `App is listening to port ${vars.port}`,
  });
});
