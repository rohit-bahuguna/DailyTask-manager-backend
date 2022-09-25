const BigPromise = require('../middlewares/bigPromise');
const customError = require('../utils/customError');
const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');
const { response } = require('../app');

const cloudinary = require('cloudinary').v2;

exports.createTask = BigPromise(async (req, res, next) => {
	let docsArray = [];
	console.log(req.files);
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

	const tasks = await taskModel.find({ user: req.user._id });

	res.status(200).json({
		success: true,
		tasks,
		totaltaskCount
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

exports.getTaskByStatus = BigPromise(async (req, res, next) => {
	const { status } = req.params;
	const id = req.user._id;

	const task = await taskModel.find({ user: id, status: status });

	res.status(200).json({
		success: true,
		task
	});
});

exports.adminGetAlltask = BigPromise(async (req, res, next) => {
	const task = await taskModel.find();

	res.status(200).json({
		success: true,
		task
	});
});

exports.adminDeleteTask = BigPromise(async (req, res, next) => {
	const deleted = await taskModel.deleteMany({ status: 'pending' });
	res.status(200).json({
		success: true,
		message: 'deleted',
		deleted
	});
});

exports.updateTask = BigPromise(async (req, res, next) => {
	const { id } = req.params;

	const updatedTask = await taskModel.findByIdAndUpdate(
		id,
		{ status: req.body.status },
		{
			new: true
		}
	);

	res.status(200).json({
		success: true,
		message: 'task updated successfully',
		updatedTask
	});
});

exports.deleteTask = BigPromise(async (req, res, next) => {
	const { id } = req.params;

	const deleted = await taskModel.findByIdAndRemove(id);

	res.status(200).json({
		success: true,
		message: 'Task Deleted Successfully',
		deleted
	});
});

exports.adminGetTaskByStatus = BigPromise(async (req, res, next) => {
	const { status } = req.params;

	const task = await taskModel.find({ status });

	res.status(200).json({
		success: true,
		task
	});
});
