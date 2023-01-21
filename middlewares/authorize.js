const { ForbiddenError } = require('../utils/ApiError');
const userService = require('../services/user.service')();
const strings = require('../config/strings');
/**
 * ACL
 * @param {string} role User roles to access resource
 */
module.exports = (role) => {
  /**
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {NextFunction} next Next function
   */
  return async (req, res, next) => {
    if (req.user[role] === true && req.user?.user_id) {
      const args = {
        _id: req.user.user_id,
      };
      const user = await userService.getById(args);
      if (!user) {
        const error = new ForbiddenError({
          message: strings.forbidden,
          details: [strings.userNotAuthorized],
        });
        next(error);
      }

      if (user.role !== role) {
        const error = new ForbiddenError({
          message: strings.forbidden,
          details: [strings.userNotAuthorized],
        });
        next(error);
      }
      next();
    } else {
      const error = new ForbiddenError({
        message: strings.forbidden,
        details: [strings.userNotAuthorized],
      });
      next(error);
    }
  };
};
