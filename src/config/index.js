export default {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: 1337
	},
	database: {
		uri: 'mongodb://localhost/challenge'
	}
};