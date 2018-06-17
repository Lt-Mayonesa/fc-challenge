export default {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: process.env.PORT || 1337,
		prefix: '/cache/v1'
	},
	database: {
		uri: 'mongodb://localhost/challenge'
	}
};