const express = require('express');
const userRouter = express.Router();

const {
	signUp,
	logIn,
	logOut,
	adminAllUser,
	adminGetOneUser,
	adminGetAllUser
} = require('../Controllers/userController');

const { isLoggedIn, customRole } = require('../middlewares/auth');

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(logIn);
userRouter.route('/logout').get(logOut);

// admin route
userRouter
	.route('/admin/users')
	.get(isLoggedIn, customRole('admin'), adminAllUser);

userRouter
	.route('/admin/user/:id')
	.get(isLoggedIn, customRole('admin'), adminGetOneUser);

module.exports = userRouter;
