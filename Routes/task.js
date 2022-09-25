const express = require('express');
const taskRouter = express.Router();
const {
	createTask,
	getAlltask,
	adminGetAlltask,
	getOnetask,
	adminGetTaskByStatus,
	adminDeleteTask,
	updateTask,
	deleteTask,
	getTaskByStatus
} = require('../Controllers/taskController');

const { isLoggedIn, customRole } = require('../middlewares/auth');

// user routes
taskRouter.route('/createtask').post(isLoggedIn, createTask);
taskRouter.route('/getalltask').get(isLoggedIn, getAlltask);
taskRouter.route('/getonetask/:id').get(isLoggedIn, getOnetask);
taskRouter.route('/updatetask/:id').put(isLoggedIn, updateTask);
taskRouter.route('/deletetask/:id').delete(isLoggedIn, deleteTask);
taskRouter.route('/gettaskbystatus/:status').get(isLoggedIn, getTaskByStatus);

taskRouter
	.route('/admingetalltask')
	.get(isLoggedIn, customRole('admin'), adminGetAlltask);

taskRouter
	.route('/admindeletealltask')
	.delete(isLoggedIn, customRole('admin'), adminDeleteTask);

taskRouter
	.route('/admin/gettaskbystatus/:status')
	.get(isLoggedIn, customRole('admin'), adminGetTaskByStatus);

module.exports = taskRouter;
