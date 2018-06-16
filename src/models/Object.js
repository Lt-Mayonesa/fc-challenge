import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	key: {
		type: 'string',
		required: true,
		unique: true
	},
	value: {
		type: 'string',
		required: true
	}
});

export default mongoose.model('Object', schema);