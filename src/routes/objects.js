import * as actions from '../controllers/ObjectController';

module.exports = app => {
	app.get('/', actions.all);
}