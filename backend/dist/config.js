'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configType = process.env.CONFIG || 'dev'; // default to development environment
var configFilepath = './config.' + configType + '.yaml';
exports.default = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(configFilepath, 'utf8'));