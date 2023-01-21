const { Router } = require('express');

const { roles } = require('../config/vars');
const userController = require('../controllers/user.controller')();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = Router();

router.get('/:_id', authenticate, userController.getUser);
router.get('/', authenticate, authorize(roles.admin), userController.getUsers);
router.post('/', authenticate, authorize(roles.admin), userController.createUser);
router.put('/:_id', authenticate, userController.updateUser);
router.delete('/:_id', authenticate, authorize(roles.admin), userController.deleteUser);

module.exports = router;
