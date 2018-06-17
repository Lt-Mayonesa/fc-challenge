'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _objects = require('./routes/objects');

var _objects2 = _interopRequireDefault(_objects);

require('./utils/db');

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

app.use(_config2.default.server.prefix, _objects2.default);

// require the database library (which instantiates a connection to mongodb)
exports.default = app;
//# sourceMappingURL=app.js.map