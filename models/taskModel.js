const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		heading: {
			type: String,
			require: [true, 'please provide a task heading '],
			trim: true,
			maxlength: [50, 'task heading shoud not be more then 50 characters']
		},
		description: {
			type: String,
			require: [true, 'please provide task description ']
		},
		docs: [
			{
				id: {
					type: String,
					required: true
				},
				secure_url: {
					type: String,
					required: true
				}
			}
		],
		status: {
			type: String,
			default: 'pending',
			enum: {
				values: ['pending', 'completed', 'hold']
			}
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('task', taskSchema);
