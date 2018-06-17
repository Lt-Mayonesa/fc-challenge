'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	env: process.env.NODE_ENV || 'development',
	/**
  * @port: the port where the server is going to listen
  * @prefix: the prefix to add to routes 
  */
	server: {
		port: process.env.PORT || 1337,
		prefix: '/cache/v1'
	},
	/**
  * Mongoose configuration
  */
	database: {
		uri: 'mongodb://localhost/challenge'
	}
};
//# sourceMappingURL=index.js.map