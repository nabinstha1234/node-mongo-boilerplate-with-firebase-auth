const errorService = require('../services/error.service')();

module.exports = (err, req, res, next) => {
  let error = errorService.getError({
    err,
    logError: false,
    name: 'errorHandler',
    operation: 'middleware.handleError',
  });

  if (error.code) {
    if (typeof error.code === 'number') {
      return res.status(error.code).send({
        message: error.message ? error.message : 'Internal server error',
        details: error?.details?.map((detail) => detail),
        data: error.data,
      });
    } else {
      return res.status(500).send({
        message: 'Internal server error',
        details: ['Internal server error'],
        data: error.data,
      });
    }
  } else {
    return res.status(500).send({
      message: 'Internal server error',
      details: ['Internal server error'],
      data: error.data,
    });
  }
};
