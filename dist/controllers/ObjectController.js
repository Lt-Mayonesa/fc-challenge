'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.all = all;
exports.get = get;
exports.set = set;
exports.deleteOne = deleteOne;
exports.deleteAll = deleteAll;

var _Object = require('../models/Object');

var _Object2 = _interopRequireDefault(_Object);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function all(req, res, next) {
	_Object2.default.find(null).exec(function (err, collection) {
		if (err) return next(err);
		return res.json(collection.map(function (each) {
			return each.key;
		}));
	});
}

function get(req, res, next) {
	_Object2.default.findOne({ key: req.params.key }).exec(function (err, doc) {
		if (err) return next(err);
		// validate if key exists and time to live is not exceded
		var now = new Date();
		if (doc && now <= doc.touchedAt.setTime(doc.touchedAt.getTime() + doc.ttl)) {
			_logger2.default.log('Cache hit');
			// It's a HIT: save the value in order to update 'touchedAt' value
			doc.save(function (err, updated) {
				if (err) return next(err);
				return res.json(doc.value);
			});
		} else {
			// It's a MISS: generate new random string and save the key, value
			_logger2.default.log('Cache miss');
			var rand_string = (0, _v2.default)();
			_Object2.default.update({ key: req.params.key }, {
				key: req.params.key,
				value: rand_string
			}, { upsert: true, setDefaultsOnInsert: true }, function (err, created) {
				if (err) return next(err);
				(0, _Object.cleanUp)(_Object2.default);
				return res.json(rand_string);
			});
		}
	});
}

function set(req, res, next) {
	var obj = {
		key: req.params.key,
		value: req.body.value
	};
	_Object2.default.update({ key: req.params.key }, obj, { upsert: true, setDefaultsOnInsert: true }, function (err, result) {
		if (err) return next(err);
		return res.status(!result.nModified ? 201 : 200).json(obj);
	});
}

function deleteOne(req, res, next) {
	_Object2.default.deleteOne({ key: req.params.key }, function (err) {
		_logger2.default.error(err);
		if (err) return next(err);

		return res.json();
	});
}

function deleteAll(req, res, next) {
	_Object2.default.remove({}, function (err) {
		if (err) return next(err);
		return res.json([]);
	});
}
//# sourceMappingURL=ObjectController.js.map