const express = require('express');
const { userController, generateToken } = require('../controllers/userController');
const { authenticateUserToken } = require('../middleware/authUserMiddleware');
const router = express.Router();


router.route('/create-user').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/:userId').delete(userController.deleteUser);
router.route('/getme').get(authenticateUserToken, userController.getMe);

module.exports = router; 