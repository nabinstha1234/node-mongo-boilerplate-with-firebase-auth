const admin = require('../config/firebase-config');

const jwtService = () => {
  const name = 'jwtService';
  /**
   * Verify jwt token
   * @param {Object} args
   * @param {string} args.token
   */
  const verifyToken = (args) => {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .verifyIdToken(args.token)
        .then((decodedToken) => {
          resolve(decodedToken);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * Extract token
   * @param {Object} args
   * @param {string} args.authorization
   */
  const extractToken = (args = {}) => {
    try {
      let bearerToken = args?.authorization ?? '';

      if (!bearerToken) {
        return null;
      }

      const [_, token] = bearerToken.split(' ');
      return token;
    } catch (err) {
      return null;
    }
  };

  return {
    verifyToken,
    extractToken,
  };
};

module.exports = jwtService;
