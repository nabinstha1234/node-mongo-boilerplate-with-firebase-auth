require('dotenv').config();

const originsEnv = process.env.ORIGINS;
let origins;
try {
  origins = originsEnv.split(',');
} catch (err) {
  origins = ['http://localhost:3000'];
}

module.exports = {
  origins,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  appName: process.env.APP_NAME || 'Wineleven',
  secretKey: process.env.SECRET_KEY || 'secretKey',
  refreshTokenKey: process.env.REFRESH_TOKEN_SECRET_KEY || 'refreshSecretKey',
  refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken',
  saltRounds: process.env.SALT_ROUNDS || 10,
  verificationEmailTokenExpiration: process.env.VERIFICATION_EMAIL_EXPIRATION || '1d',
  authTokenExpiration: process.env.AUTH_TOKEN_EXPIRATION || '10s',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
  forgotPasswordTokenExpiration: process.env.FORGOT_PASSWORD_TOKEN_EXPIRATION || '1hr',
  tokenType: {
    refresh: 'refresh',
  },
  languages: {
    english: 'en',
    japanese: 'jp',
  },
  mongo: {
    url: process.env.MONGO_URL || `mongodb://127.0.0.1:27017/wineleven`,
  },
  roles: {
    admin: 'admin',
    producer: 'producer',
    user: 'user',
  },
  models: {
    User: 'User',
  },
  log: {
    fileLogLevel: process.env.FILE_LOG_LEVEL,
    dirname: process.env.LOG_DIRNAME,
    errorLogFilename: process.env.ERROR_LOG_FILENAME || 'error',
    logLevels: {
      error: 'error',
      warn: 'warn',
      info: 'info',
      verbose: 'verbose',
      debug: 'debug',
      silly: 'silly',
    },
  },
  acl: {
    // acl values goes here, eg. user: ['admin', 'user']
  },
  events: {
    onSignUp: 'onSignUp',
  },
};
