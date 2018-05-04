'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _social = require('../plugins/social');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// router.get("/user", ensureAuth, (req, res) => {
//   res.json({ status: req.user });
// });

router.get("/user", _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ status: req.user });
});

exports.default = router;