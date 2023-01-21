const vars = require('../config/vars');
const strings = require('../config/strings');
const { NotAuthenticatedError } = require('../utils/ApiError');

const jwtService = require('../services/jwt.service')();

/**
 * Checks token and handles authentication
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
module.exports = async (req, res, next) => {
  try {
    let token = await jwtService.extractToken(req.headers);
    try {
      let decoded = await jwtService.verifyToken({
        token,
      });
      const user = decoded;
      if (user) {
        if (user[vars.roles.admin] === true) {
          user.role = vars.roles.admin;
        } else if (user[vars.roles.user] === true) {
          user.role = vars.roles.user;
        } else if (user[vars.roles.producer] === true) {
          user.role = vars.roles.moderator;
        } else {
          throw new NotAuthenticatedError({
            message: strings.userNotAuthenticated,
            details: [strings.userNotAuthenticated],
          });
        }
      }
      req.user = decoded;
      next();
    } catch (err) {
      throw new NotAuthenticatedError({
        message: strings.userNotAuthenticated,
        details: [strings.userNotAuthenticated],
      });
    }
  } catch (err) {
    next(err);
  }
};
