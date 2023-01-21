const errorService = require('../services/error.service')();

const joiService = () => {
  /**
   * Validate
   * @param {Object} args
   * @param {Object} args.input
   * @param {any} args.schema
   */
  const validate = async (args = {}) => {
    try {
      const schema = args.schema;
      const input = args.input;

      return await schema.validateAsync(input, { abortEarly: false });
    } catch (err) {
      errorService.throwError({
        err,
        operation: 'validate',
        name: 'JoiService',
        logError: false,
      });
    }
  };

  return {
    validate,
  };
};

module.exports = joiService;
