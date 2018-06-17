import Model, { cleanUp } from '../models/Object';
import logger from '../utils/logger';
import uuid from 'uuid/v1';

export function all(req, res, next) {
	Model.find(null).exec(function(err, collection) {
		if (err) return next(err);
		return res.json(collection.map(each => each.key));
	});
}

export function get(req, res, next) {
	Model.findOne({ key: req.params.key }).exec(function(err, doc) {
		if (err) return next(err);
		// validate if key exists and time to live is not exceded
		let now = new Date();
		if (
			doc &&
			now <= doc.touchedAt.setTime(doc.touchedAt.getTime() + doc.ttl)
		) {
			logger.log('Cache hit');
			// It's a HIT: save the value in order to update 'touchedAt' value
			doc.save(function(err, updated) {
				if (err) return next(err);
				return res.json(doc.value);
			});
		} else {
			// It's a MISS: generate new random string and save the key, value
			logger.log('Cache miss');
			let rand_string = uuid();
			Model.update(
				{ key: req.params.key },
				{
					key: req.params.key,
					value: rand_string
				},
				{ upsert: true, setDefaultsOnInsert: true },
				function(err, created) {
					if (err) return next(err);
					cleanUp(Model);
					return res.json(rand_string);
				}
			);
		}
	});
}

export function set(req, res, next) {
	const obj = {
		key: req.params.key,
		value: req.body.value
	};
	Model.update(
		{ key: req.params.key },
		obj,
		{ upsert: true, setDefaultsOnInsert: true },
		function(err, result) {
			if (err) return next(err);
			return res.status(!result.nModified ? 201 : 200).json(obj);
		}
	);
}

export function deleteOne(req, res, next) {
	Model.deleteOne({ key: req.params.key }, function(err) {
		logger.error(err);
		if (err) return next(err);

		return res.json();
	});
}

export function deleteAll(req, res, next) {
	Model.remove({}, function(err) {
		if (err) return next(err);
		return res.json([]);
	});
}
