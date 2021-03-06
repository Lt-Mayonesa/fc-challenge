import mongoose, { Model } from 'mongoose';

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

/**
 * Implements https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)
 * Method to remove the oldest value in collection
 * 
 * If the amounts of models is greater than the permitted
 * search for the least reacently used record and remove it
 * 
 * @param {Model} model 
 */
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