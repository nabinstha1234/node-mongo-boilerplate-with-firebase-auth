const vars = require('../vars');

const users = [
  {
    email: 'admin@api.com',
    password: 'password', // password: 'password'
    firstName: 'Admin',
    lastName: 'Api',
    role: vars.roles.admin,
  },
  {
    email: 'user@api.com',
    password: 'password', // password: 'password'
    firstName: 'User',
    lastName: 'Api',
    role: vars.roles.user,
  },
  {
    email: 'producer@api.com',
    password: 'password', // password: 'password'
    firstName: 'Producer',
    lastName: 'Api',
    role: vars.roles.producer,
  },
];

module.exports = users;
