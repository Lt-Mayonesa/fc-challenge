import mongoose from 'mongoose';

export const MAX_INSTANCES = 10;
export const DEFAULT_TTL = 60 * 1000;

const schema = new mongoose.Schema(
	{
		key: {
			type: 'string',
			required: true,
			unique: true
		},
		value: {
			type: 'string',
			required: true
		},
		ttl: {
			// object's time to live in miliseconds
			type: Number
		},
		touchedAt: {
			type: Date,
			required: true,
			default: new Date()
		}
	},
	{
		versionKey: false
	}
);

schema.post('save', function(doc) {
	cleanUp(this.constructor);
});

schema.pre('save', function(next) {
	this.touchedAt = new Date();
	if (!this.ttl) this.ttl = DEFAULT_TTL;
	return next();
});

schema.pre('update', function(next) {
	let ttl = this.getUpdate().ttl || DEFAULT_TTL;
	this.update({
		touchedAt: new Date(),
		ttl: ttl
	});
	next();
});

export default mongoose.model('Object', schema);

export function cleanUp(model) {
	model.count(function(err, count) {
		if (count > MAX_INSTANCES) {
			model
				.deleteOne()
				.sort({ touchedAt: 1 })
				.exec(function(err2, found) {
					console.log('deleted', found);
				});
		}
	});
}