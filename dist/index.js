'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// listen on the designated port found in the configuration

// import custom configuration and utilities
_app2.default.listen(_config2.default.server.port, function (err) {
	if (err) {
		_logger2.default.error(err);
		process.exit(1);
	}
	// output the status of the api in the terminal
	_logger2.default.info('API is now running on port ' + _config2.default.server.port + ' in ' + _config2.default.env + ' mode');
});
//# sourceMappingURL=index.js.map