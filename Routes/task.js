const express = require('express');
const taskRouter = express.Router();
const {
	createTask,
	getAlltask,
	adminGetAlltask,
	getOnetask
} = require('../Controllers/taskController');

const { isLoggedIn, customRole } = require('../middlewares/auth');

// user routes
taskRouter.route('/createtask').get(isLoggedIn, createTask);
taskRouter.route('/getalltask').get(isLoggedIn, getAlltask);
taskRouter.route('/getonetask').get(isLoggedIn, getOnetask);

taskRouter
	.route('/createtask')
	.get(isLoggedIn, customRole('admin'), adminGetAlltask);

module.exports = taskRouter;
