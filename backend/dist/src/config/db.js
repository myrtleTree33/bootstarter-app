"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _config = require("../../config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configures Mongo DB using Mongoose driver and ES6 promises

var mongoose = require("mongoose");


var db = function () {
  mongoose.Promise = Promise; // ES6 promises
  mongoose.connect(_config2.default.db.mongoURI).then(function () {
    return _winston2.default.info("Connected to database!");
  }).catch(function (e) {
    return _winston2.default.error("Unable to connect to database: " + e);
  });
}();

exports.default = db;