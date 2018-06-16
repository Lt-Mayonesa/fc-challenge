import Model from '../models/Object';
import logger from '../utils/logger';

export function all(req, res, err) {
	Model.find(function(err, collection) {
		if (err) return next(err);
		return res.json(collection);
	});
}

export function find(req, res) {
	Model.find({ key: req.params.key }, function(err, collection) {
		if (err) return next(err);
		return res.json(collection);
	});
}

export function create(req, res, next) {
	Model.create(req.body, function(err, model) {
		if (err) return next(err);

		return res.json(model);
	});
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
		return res.json();
	});
}
