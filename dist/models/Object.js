'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DEFAULT_TTL = exports.MAX_INSTANCES = undefined;
exports.cleanUp = cleanUp;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_INSTANCES = exports.MAX_INSTANCES = 10;
var DEFAULT_TTL = exports.DEFAULT_TTL = 60 * 1000;

var schema = new _mongoose2.default.Schema({
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
}, {
	versionKey: false
});

schema.post('save', function (doc) {
	cleanUp(this.constructor);
});

schema.pre('save', function (next) {
	this.touchedAt = new Date();
	if (!this.ttl) this.ttl = DEFAULT_TTL;
	return next();
});

schema.pre('update', function (next) {
	var ttl = this.getUpdate().ttl || DEFAULT_TTL;
	this.update({
		touchedAt: new Date(),
		ttl: ttl
	});
	next();
});

exports.default = _mongoose2.default.model('Object', schema);

/**
 * Implements https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)
 * Method to remove the oldest value in collection
 * 
 * If the amounts of models is greater than the permitted
 * search for the least reacently used record and remove it
 * 
 * @param {Model} model 
 */

function cleanUp(model) {
	model.count(function (err, count) {
		if (count > MAX_INSTANCES) {
			model.deleteOne().sort({ touchedAt: 1 }).exec(function (err2, found) {
				console.log('deleted', found);
			});
		}
	});
}
//# sourceMappingURL=Object.js.map