'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize the app


// import custom configuration and utilities
var app = (0, _express2.default)();

// initialize middleware
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// initialize our logger
app.use((0, _morgan2.default)('combined'));

// listen on the designated port found in the configuration
app.listen(_config2.default.server.port, function (err) {
	if (err) {
		_logger2.default.error(err);
		process.exit(1);
	}

	// require the database library (which instantiates a connection to mongodb)
	require('./utils/db');

	// loop through all routes and dynamically require them – passing api
	_fs2.default.readdirSync(_path2.default.join(__dirname, 'routes')).map(function (file) {
		require('./routes/' + file)(app);
	});

	// output the status of the api in the terminal
	_logger2.default.info('API is now running on port ' + _config2.default.server.port + ' in ' + _config2.default.env + ' mode');
});

exports.default = app;
//# sourceMappingURL=server.js.map