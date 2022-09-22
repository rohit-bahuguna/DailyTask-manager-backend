// require / import packages here
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// created app here
const app = express();

// importing  all routers here
const user = require('./Routes/user');
const task = require('./Routes/task');

// using Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using Third - party middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp/'
	})
);

//using router middleware here
app.use('/api/v1', user);
app.use('/api/v1', task);

// expored to index.js
module.exports = app;
