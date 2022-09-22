const BigPromise = require('../middlewares/bigPromise');
const customError = require('../utils/customError');
const userModel = require('../models/userModel');
const cookieToken = require('../utils/cookieToken');

exports.signUp = BigPromise(async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return next(new customError('please provide all fileds', 400));
	}
	const isExistingUser = await userModel.findOne({ email });

	console.log(!isExistingUser);

	if (isExistingUser) {
		return res.status(404).json({
			success: false,
			message: 'User Already Exist'
		});
	}

	const user = await userModel.create({
		name,
		email,
		password
	});

	cookieToken(user, res);
});

exports.logIn = BigPromise(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new customError('please provide email and password'), 400);
	}
	const user = await userModel.findOne({ email }).select('+password');

	if (!user) {
		return next(new customError('user does not exist', 400));
	}

	const isPosswordValid = await user.IsvalidPassword(password);
	if (!isPosswordValid) {
		return next(new customError('invalid password '), 400);
	}
	user.password = undefined;
	cookieToken(user, res);
});

exports.logOut = BigPromise(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true
	});

	res.status(200).json({
		success: true,
		message: 'user logout successfully'
	});
});

exports.adminAllUser = BigPromise(async (req, res, next) => {
	const users = await userModel.find();

	res.status(200).json({
		success: true,
		users
	});
});

exports.adminGetOneUser = BigPromise(async (req, res, next) => {
	const { id } = req.params;

	const user = await userModel.findById(id);
	if (!user) {
		return next(new customError('user not found'), 400);
	}
	res.status(200).json({
		success: true,
		user
	});
});
