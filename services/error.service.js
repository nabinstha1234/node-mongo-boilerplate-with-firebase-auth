const Joi = require('joi');

const { CustomError, AppError, ValidationError } = require('../utils/ApiError');
const logger = require('../utils/winstonLogger')('errorService');

const errorService = () => {
  /**
   * Get the error object
   * @param {Object} args
   * @param {Error | ApiError | JoiError} args.err
   * @param {boolean=} args.logError
   * @param {string} args.operation
   * @returns {ApiError} - Converted ApiError
   */
  const getError = (args) => {
    let err = args.err;

    if (err instanceof Joi.ValidationError) {
      err = new ValidationError({
        details: err.details.map((x) => x.message),
      });
    } else if (!(err instanceof CustomError)) {
      // Error is unknown error
      err = new AppError({
        details: [err?.message],
      });
    }

    if (args.logError) {
      logger.error({
        message: err.message,
        operation: args.operation,
        data: err,
      });
    }

    return err;
  };

  /**
   * Throw error
   * @param {Object} args
   * @param {Error | ApiError | JoiError} args.err
   * @param {boolean=} args.logError
   * @param {string} args.operation
   * @throws {ApiError}
   */
  const throwError = (args) => {
    let err = args.err;

    if (err instanceof Joi.ValidationError) {
      err = new ValidationError({
        details: err.details.map((x) => x.message),
      });
    } else if (!(err instanceof CustomError)) {
      // Error is unknown error
      err = new AppError({
        details: [err?.message],
      });
    }

    if (args.logError) {
      logger.error({
        message: err.message,
        operation: args.operation,
        data: err,
      });
    }

    throw err;
  };

  return {
    getError,
    throwError,
  };
};

module.exports = errorService;
