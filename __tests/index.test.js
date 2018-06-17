import request from 'supertest';
import Api from '../src';

const app = Api;

describe('Challenge API', () => {
	afterEach(() => {
		app.server.close();
	});

	test('should list all keys', () => {
		return request(app)
			.get('/')
			.expect(200)
			.then(res => {
				expect(typeof res.body).toBe('array');
			});
	});
});
