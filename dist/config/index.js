'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: process.env.PORT || 1337,
		prefix: '/cache/v1'
	},
	database: {
		uri: 'mongodb://localhost/challenge'
	}
};
//# sourceMappingURL=index.js.map