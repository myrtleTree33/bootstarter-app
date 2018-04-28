"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _social = require("../plugins/social");

var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/user", _social.ensureAuth, function (req, res) {
  res.json({ status: req.user });
});

exports.default = router;