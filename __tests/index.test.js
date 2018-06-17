import request from 'supertest';
import app from '../src/app';

const PREFIX = '/cache/v1';

describe('Challenge API', () => {
	test('should flush all keys', () => {
		return request(app)
			.delete(`${PREFIX}/flush/all`)
			.expect(200)
			.then(res => {
				expect(typeof res.body).toBe('object');
			});
	});

	test('should list all keys', () => {
		return request(app)
			.get(`${PREFIX}/`)
			.expect(200)
			.then(res => {
				expect(Array.isArray(res.body)).toBe(true);
				expect(res.body.length).toBe(0);
			});
	});

	test('should create new key', () => {
		return request(app)
			.put(`${PREFIX}/mykey`)
			.send({value: 'my value'})
			.expect(201)
			.then(res => {
				expect(typeof res.body).toBe('object');
			});
	});

	test('should hit and return value', () => {
		return request(app)
			.get(`${PREFIX}/mykey`)
			.expect(200)
			.then(res => {
				expect(typeof res.body).toBe('string');
				expect(res.body).toBe('my value');
			});
	});

	test('should miss and return new value', () => {
		return request(app)
			.get(`${PREFIX}/myspecialkey`)
			.expect(200)
			.then(res => {
				expect(typeof res.body).toBe('string');
			});
	});

	test('should list all keys', () => {
		return request(app)
			.get(`${PREFIX}/`)
			.expect(200)
			.then(res => {
				expect(Array.isArray(res.body)).toBe(true);
				expect(res.body.length).toBe(2);
			});
	});

	test('should miss and return new value', () => {
		return request(app)
			.get(`${PREFIX}/myveryspecialkey`)
			.expect(200)
			.then(res => {
				expect(typeof res.body).toBe('string');
			});
	});

	test('should delete key', () => {
		return request(app)
		.delete(`${PREFIX}/mykey`)
		.expect(200)
		.then(res => {
			expect(res.body).toBe("");
		})
	})
});
