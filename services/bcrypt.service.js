const bcrypt = require('bcrypt');

const vars = require('../config/vars');

const bcryptService = () => {
  const name = 'bcryptService';

  /**
   * Hash
   * @param {string} password
   * @returns {string}
   */
  const hash = async (password) => {
    const salt = await bcrypt.genSalt(Number(vars.saltRounds));
    return bcrypt.hash(password, salt);
  };

  /**
   * Compares hash and plain text
   * @param {string} plainText
   * @param {string} hash
   * @returns {boolean}
   */
  const compare = (plainText, hash) => {
    return bcrypt.compare(plainText, hash);
  };

  return {
    hash,
    compare,
  };
};

module.exports = bcryptService;
