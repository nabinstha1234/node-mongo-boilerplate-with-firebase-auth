const vars = require('../config/vars');
const strings = require('../config/strings');
const userValidation = require('../validation/user.validation');
const userService = require('../services/user.service')();
const errorService = require('../services/error.service')();
const joiService = require('../services/joi.service')();

const userController = () => {
  const name = 'userController';

  const getUsers = async (req, res, next) => {
    const operation = 'getUsers';

    try {
      let result = await userService.getAll(req.query || {});

      return res.status(200).send({
        message: strings.userListedSuccess,
        data: result,
      });
    } catch (err) {
      const error = errorService.getError({ err, name, operation, logError: true });
      next(error);
    }
  };

  const getUser = async (req, res, next) => {
    const operation = 'getUser';

    try {
      const _id = req.params._id;

      if (_id !== req?.user?._id && req?.user?.role !== vars.roles.admin) {
        return res.status(403).send({
          message: strings.forbidden,
          data: { _id },
        });
      }

      let user = await userService.getById({ _id });
      if (!user) {
        return res.status(404).send({
          message: strings.userNotFound,
          data: {},
        });
      }

      return res.status(200).send({
        message: strings.userListedSuccess,
        data: user,
      });
    } catch (err) {
      const error = errorService.getError({ err, name, operation, logError: true });
      next(error);
    }
  };

  const createUser = async (req, res, next) => {
    const operation = 'createUser';

    try {
      const _id = req.params._id;
      const args = req.body;
      const email = args?.email;
      const password = args?.password;
      const firstName = args?.firstName;
      const lastName = args?.lastName;
      const role = args?.role;

      const schema = userValidation.create;
      await joiService.validate({
        schema,
        input: {
          email,
          password,
          firstName,
          lastName,
          role,
        },
      });

      if (role == vars.roles.admin) {
        throw new Error('You are not authorized to create admin user');
      }

      let user = await userService.create({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      return res.status(200).send({
        message: strings.userCreateSuccess,
        data: user,
      });
    } catch (err) {
      const error = errorService.getError({ err, name, operation, logError: true });
      next(error);
    }
  };

  const updateUser = async (req, res, next) => {
    const operation = 'updateUser';

    try {
      const _id = req.params._id;
      const args = req.body;

      const firstName = args?.firstName;
      const lastName = args?.lastName;
      if (_id !== req?.user?._id && req?.user?.role !== vars.roles.admin) {
        return res.status(403).send({
          message: strings.forbidden,
          data: { _id },
        });
      }

      const schema = userValidation.update;
      await joiService.validate({
        schema,
        input: {
          firstName,
          lastName,
        },
      });

      let user = await userService.update({
        _id,
        firstName,
        lastName,
      });

      return res.status(200).send({
        message: strings.userUpdateSuccess,
        data: user,
      });
    } catch (err) {
      const error = errorService.getError({ err, name, operation, logError: true });
      next(error);
    }
  };

  const deleteUser = async (req, res, next) => {
    const operation = 'deleteUser';

    try {
      const _id = req.params._id;
      const data = req.body;

      if (_id === req?.user?._id) {
        return res.status(403).send({
          message: strings.cannotDeleteOwnAccount,
          data: {
            _id,
          },
        });
      }

      const user = await userService.deleteById({ _id });
      if (!user) {
        return res.status(404).send({
          message: strings.userNotFound,
          data: user,
        });
      }

      return res.status(200).send({
        message: strings.userDeleteSuccess,
        data: user,
      });
    } catch (err) {
      const error = errorService.getError({ err, name, operation, logError: true });
      next(error);
    }
  };

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
};

module.exports = userController;
