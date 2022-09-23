const express = require('express');
const taskRouter = express.Router();
const {
	createTask,
	getAlltask,
	adminGetAlltask,
	getOnetask,
	adminGetAllUsers
} = require('../Controllers/taskController');

const { isLoggedIn, customRole } = require('../middlewares/auth');

// user routes
taskRouter.route('/createtask').post(isLoggedIn, createTask);
taskRouter.route('/getalltask').get(isLoggedIn, getAlltask);
taskRouter.route('/getonetask/:id').get(isLoggedIn, getOnetask);

taskRouter
	.route('/admingetalltask')
	.get(isLoggedIn, customRole('admin'), adminGetAlltask);

taskRouter
	.route('/admingetalluser')
	.get(isLoggedIn, customRole('admin'), adminGetAllUsers);

module.exports = taskRouter;
