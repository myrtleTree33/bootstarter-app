'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('./src/config/log.js');

var _log2 = _interopRequireDefault(_log);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./src/routes/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./src/routes/users');

var _users2 = _interopRequireDefault(_users);

var _db = require('./src/config/db');

var _db2 = _interopRequireDefault(_db);

var _social = require('./src/plugins/social');

var _social2 = _interopRequireDefault(_social);

var _enableCors = require('./src/plugins/enableCors');

var _enableCors2 = _interopRequireDefault(_enableCors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // configure logging first

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// enable cors 
(0, _enableCors2.default)(app);
// Uncomment this to enable social authentication
(0, _social2.default)(app);

// place route middleware here -------------------------------
app.use('/', _index2.default);
app.use('/users', _users2.default);
// -----------------------------------------------------------

app.use(function (req, res, next) {
  return res.json(404, { description: 'API not found.' });
});

exports.default = app;