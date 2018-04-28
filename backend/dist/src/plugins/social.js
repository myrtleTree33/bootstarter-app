"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuth = ensureAuth;

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passportGoogleAuth = require("passport-google-auth");

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initializes passport using server-based storage (sessions)
 * 
 * @param {*} app 
 */
function initCore(app) {
  _passport2.default.serializeUser(function (user, done) {
    return done(null, user);
  });
  _passport2.default.deserializeUser(function (user, done) {
    return done(null, user);
  });
  app.use((0, _cookieParser2.default)());
  app.use((0, _expressSession2.default)({
    secret: _config2.default.socialAuth.session.secret,
    name: _config2.default.socialAuth.session.name,
    // 	store:  new redisstore({
    // 		host: config.socialAuth.session.redis.host,
    // 		port: config.socialAuth.session.redis.port
    // 	}),
    proxy: true,
    resave: true,
    saveUninitialized: true
  }));
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());
}

/**
 * Initializes Google auth strategy
 *
 * @param {Object} app
 */
function initGoogle(app) {
  _passport2.default.use(new _passportGoogleAuth.Strategy({
    clientId: _config2.default.socialAuth.google.clientId,
    clientSecret: _config2.default.socialAuth.google.clientSecret,
    callbackURL: _config2.default.socialAuth.google.callbackURL
  }, function (accessToken, refreshToken, profile, next) {
    _User2.default.upsertGoogleUser(accessToken, refreshToken, profile).then(function (user) {
      return next(null, user);
    }).catch(function (err) {
      return next(createError(400));
    });
  }));

  app.get("/auth/google", _passport2.default.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/userinfo.email"]
  }));

  app.get("/auth/google/callback", _passport2.default.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/google"
  }));
}

/**
 * Use this middleware for protected routes needing authentication.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/"); // TODO should redirect to main page?
}

/**
 * Initializes social authentication using passport
 * @param {Object} app
 */
function initPassport(app) {
  initCore(app);
  initGoogle(app);
}

exports.default = initPassport;