const { NotImplementedError } = require('../utils/ApiError');

const emailService = () => {
  const name = 'emailService';

  /**
   * Send email
   */
  const sendMail = async (args = {}) => {
    throw new NotImplementedError({
      message: 'Email service not implemented',
      details: ['emailServiceNotImplemented'],
    });
  };

  return {
    sendMail,
  };
};

module.exports = emailService;
