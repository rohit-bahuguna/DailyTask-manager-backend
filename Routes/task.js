const express = require('express');
const taskRouter = express.Router();
const {
	createTask,
	getAlltask,
	adminGetAlltask,
	getOnetask,
	adminGetAllUsers,
	adminDeleteTask,
	updateTask,
	deleteTask
} = require('../Controllers/taskController');

const { isLoggedIn, customRole } = require('../middlewares/auth');

// user routes
taskRouter.route('/createtask').post(isLoggedIn, createTask);
taskRouter.route('/getalltask').get(isLoggedIn, getAlltask);
taskRouter.route('/getonetask/:id').get(isLoggedIn, getOnetask);
taskRouter.route('/updatetask/:id').put(isLoggedIn, updateTask);
taskRouter.route('/deletetask/:id').delete(isLoggedIn, deleteTask);
taskRouter
	.route('/admingetalltask')
	.get(isLoggedIn, customRole('admin'), adminGetAlltask);

taskRouter
	.route('/admingetalluser')
	.get(isLoggedIn, customRole('admin'), adminGetAllUsers);

taskRouter
	.route('/admindeletealltask')
	.delete(isLoggedIn, customRole('admin'), adminDeleteTask);

module.exports = taskRouter;
