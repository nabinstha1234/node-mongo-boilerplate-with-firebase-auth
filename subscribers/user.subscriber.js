const { userEmitter } = require('./');
const vars = require('../config/vars');

const logger = require('../utils/winstonLogger')('userEmitter');
const jwtService = require('../services/jwt.service')();
const emailService = require('../services/email.service')();

/* On User Signup */
userEmitter.on(vars.events.onSignUp, async (args = {}) => {
  const operation = vars.events.onSignUp;
  logger.info({
    operation,
    message: 'User onSignUp emitted',
    data: {
      username: args?.username,
      email: args?.email,
    },
  });

  let payload = { email: args.email };
  const token = await jwtService.generateToken({
    payload,
    secretKey: vars.secretKey,
    expiresAt: vars.verificationEmailTokenExpiration,
  });

  logger.info({
    operation,
    message: 'Token created',
    data: {
      username: args?.username,
      email: args?.email,
    },
  });

  // send email to user (not implemented)
  emailService
    .sendMail(args)
    .then((data) => logger.info({ operation, message: 'Verification email sent', data: args }))
    .catch((err) => logger.error({ operation, message: 'Error sending verification email', data: err }));
});

module.exports = userEmitter;
