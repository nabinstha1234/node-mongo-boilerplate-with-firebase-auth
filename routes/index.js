const express = require('express');

const userRouter = require('./user.route');

const app = express();

app.get('/', (_, res) => {
  return res.send({
    message: 'Index route',
  });
});

app.use('/users', userRouter);

module.exports = app;
