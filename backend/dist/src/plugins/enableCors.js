"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function enableCors(app) {
  // TODO harden CORs when needed
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

exports.default = enableCors;