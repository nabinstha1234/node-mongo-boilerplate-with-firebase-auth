const Joi = require('joi');

const { ValidationError, NotImplementedError } = require('../utils/ApiError');
const strings = require('../config/strings');

const messages = {
  email: {
    'string.base': strings.emailRequired,
    'string.empty': strings.emailRequired,
    'string.email': strings.invalidEmail,
    'any.required': strings.emailRequired,
  },
  password: {
    'string.base': strings.passwordValidation,
    'string.empty': strings.passwordValidation,
    'any.required': strings.passwordValidation,
  },
  firstName: {
    'string.base': strings.firstNameValidation,
    'string.empty': strings.firstNameValidation,
    'string.required': strings.firstNameValidation,
  },
  lastName: {
    'string.base': strings.lastNameValidation,
  },
  username: {
    'string.base': strings.lastNameValidation,
  },
  token: {
    'string.base': strings.tokenValidation,
    'string.empty': strings.tokenValidation,
    'string.required': strings.tokenValidation,
  },
};

const signUp = Joi.object({
  email: Joi.string().required().email().messages(messages.email),
  password: Joi.string().required().messages(messages.password),
  firstName: Joi.string().required().messages(messages.firstName),
  lastName: Joi.string().messages(messages.lastName),
  username: Joi.string().messages(messages.lastName),
});

const login = Joi.object({
  email: Joi.string().required().email().messages(messages.email),
  password: Joi.string().required().messages(messages.password),
});

const emailVerification = Joi.object({
  token: Joi.string().required().messages(messages.token),
});

const forgotPassword = Joi.object({
  email: Joi.string().required().email().messages(messages.email),
});

const resetPassword = Joi.object({
  token: Joi.string().required().messages(messages.token),
  password: Joi.string().required().messages(messages.password),
});

const resendVerificationEmail = Joi.object({
  email: Joi.string().required().email().messages(messages.email),
});

module.exports = {
  signUp,
  login,
  emailVerification,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
};
