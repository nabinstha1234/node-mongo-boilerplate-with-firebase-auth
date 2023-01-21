const Joi = require('joi');

const vars = require('../config/vars');
const strings = require('../config/strings');

const messages = {
  firstNameUpdate: {
    'string.base': strings.firstNameValidation,
    'string.empty': strings.firstNameValidation,
    'string.required': strings.firstNameValidation,
    'any.required': strings.firstNameValidation,
  },
  lastNameUpdate: {
    'string.base': strings.lastNameValidation,
  },
  email: {
    'string.base': strings.emailRequired,
    'string.empty': strings.emailRequired,
    'string.required': strings.emailRequired,
    'any.required': strings.emailRequired,
    'string.email': strings.invalidEmail,
  },
  password: {
    'string.base': strings.passwordValidation,
    'string.empty': strings.passwordValidation,
    'string.required': strings.passwordValidation,
    'any.required': strings.passwordValidation,
  },
  firstNameCreate: {
    'string.base': strings.firstNameValidation,
    'string.empty': strings.firstNameValidation,
    'string.required': strings.firstNameValidation,
    'any.required': strings.firstNameValidation,
  },
  lastNameCreate: {
    'string.base': strings.lastNameValidation,
  },
  role: {
    'string.base': strings.roleValidation,
  },
};

const create = Joi.object({
  email: Joi.string().required().email().messages(messages.email),
  password: Joi.string().required().messages(messages.password),
  firstName: Joi.string().required().messages(messages.firstNameCreate),
  lastName: Joi.string().messages(messages.lastNameCreate),
  role: Joi.string().messages(messages.role),
});

const update = Joi.object({
  firstName: Joi.string().required().messages(messages.firstNameUpdate),
  lastName: Joi.string().messages(messages.lastNameUpdate),
});

const changePassword = Joi.object({
  oldPassword: Joi.string().required().messages(messages.password),
  password: Joi.string().required().messages(messages.password),
});

module.exports = {
  create,
  update,
  changePassword,
};
