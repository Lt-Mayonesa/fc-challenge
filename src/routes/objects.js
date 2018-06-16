import * as actions from '../controllers/ObjectController';

module.exports = app => {
	app.get('/', actions.all);
	app.get('/:key', actions.find);
	app.post('/', actions.create);
	app.delete('/:key', actions.deleteOne);
	app.delete('/flush/all', actions.deleteAll);
}