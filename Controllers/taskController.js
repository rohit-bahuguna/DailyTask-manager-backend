const BigPromise = require('../middlewares/bigPromise');
const customError = require('../utils/customError');
const taskModel = require('../models/taskModel');
const cloudinary = require('cloudinary').v2;

exports.createTask = BigPromise(async (req, res, next) => {
	let docsArray = [];

	if (req.files) {
		let docs = Object.keys(req.files).map(key => req.files[key]);

		for (let i = 0; i < docs.length; i++) {
			let result = await cloudinary.uploader.upload(docs[i].tempFilePath, {
				folder: 'task'
			});
			docsArray.push({
				id: result.public_id,
				secure_url: result.secure_url
			});
		}
	}

	req.body.docs = docsArray;
	req.body.user = req.user.id;

	const task = await taskModel.create(req.body);

	res.status(200).json({
		success: true,
		task
	});
});

exports.getAlltask = BigPromise(async (req, res, next) => {
	const totaltaskCount = await taskModel.countDocuments();

	const task = await taskModel.find({ _id: req.body.user });

	res.status(200).json({
		success: true,
		task,
		totaltaskCount
	});
});

exports.adminGetAlltask = BigPromise(async (req, res, next) => {
	const task = await taskModel.find();

	res.status(200).json({
		success: true,
		task
	});
});

exports.getOnetask = BigPromise(async (req, res, next) => {
	const { id } = req.params;

	const task = await taskModel.findById(id);
	if (!task) {
		return next(new customError('no task found '), 400);
	}

	res.status(200).json({
		success: true,
		task
	});
});
