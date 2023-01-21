const mongoose = require('mongoose');

const { models } = require('../config/vars');

const schema = new mongoose.Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model(models.User, schema);

module.exports = User;
