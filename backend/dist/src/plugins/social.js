"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuth = undefined;
exports.default = initPassport;

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleAuth = require("passport-google-auth");

var _passportFacebook = require("passport-facebook");

var _passportGoogleToken = require("passport-google-token");

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO implement JWT
// check out https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
// TODO https://www.sitepoint.com/spa-social-login-google-facebook/

function generateAccessToken(userId) {
  var secret = _config2.default.socialAuth.jwt.secret;
  var token = _jsonwebtoken2.default.sign({}, secret, {
    expiresIn: "1h",
    audience: _config2.default.socialAuth.jwt.audience,
    issuer: _config2.default.socialAuth.jwt.issuer,
    subject: userId.toString()
  });
  return token;
}

/**
 * Initializes passport using server-based storage (sessions)
 *
 * @param {*} app
 */

// import cookieParser from "cookie-parser";
// import session from "express-session";
function initCore(app) {
  app.use(_passport2.default.initialize());
  _passport2.default.serializeUser(function (user, done) {
    return done(null, user);
  });
  _passport2.default.deserializeUser(function (user, done) {
    return done(null, user);
  });
  // set JWT options
  var jwtOptions = {
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    jwtFromRequest: _passportJwt2.default.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: _config2.default.socialAuth.jwt.secret,
    issuer: _config2.default.socialAuth.jwt.issuer,
    audience: _config2.default.socialAuth.jwt.audience
  };

  _passport2.default.use(new _passportJwt2.default.Strategy(jwtOptions, function (payload, done) {
    var userId = payload.sub;
    _User2.default.findById(userId).then(function (user) {
      return done(null, user, payload);
    }).catch(function (err) {
      return done(err);
    });
  }));
}

/**
 * Initializes Google auth strategy
 *
 * @param {Object} app
 */
function initGoogle(app) {
  var _config$socialAuth$go = _config2.default.socialAuth.google,
      clientID = _config$socialAuth$go.clientID,
      clientSecret = _config$socialAuth$go.clientSecret,
      callbackURL = _config$socialAuth$go.callbackURL;

  _passport2.default.use(new _passportGoogleAuth.Strategy({ clientId: clientID, clientSecret: clientSecret, callbackURL: callbackURL }, function (accessToken, refreshToken, profile, next) {
    _User2.default.upsertGoogleUser(accessToken, refreshToken, profile).then(function (user) {
      return next(null, user);
    }).catch(function (err) {
      return next(createError(400));
    });
  }));

  app.get("/auth/google", _passport2.default.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/userinfo.email"]
  }));

  app.get("/auth/google/callback", function (req, res, next) {
    _passport2.default.authenticate("google", function (err, user, info) {
      if (err) {
        return next(err);
      }
      var token = generateAccessToken(user._id);
      console.log("Token=" + token);
      return res.json({ token: token });
    })(req, res, next);
  });

  _winston2.default.info("Initiated Google login auth!");
}

function initGoogleToken(app) {
  var _config$socialAuth$go2 = _config2.default.socialAuth.google,
      clientID = _config$socialAuth$go2.clientID,
      clientSecret = _config$socialAuth$go2.clientSecret;

  _passport2.default.use(new _passportGoogleToken.Strategy({ clientID: clientID, clientSecret: clientSecret }, function (accessToken, refreshToken, profile, next) {
    _User2.default.upsertGoogleUser(accessToken, refreshToken, profile).then(function (user) {
      return next(null, user);
    }).catch(function (err) {
      return next(createError(400));
    });
  }));

  app.post("/auth/google/token", _passport2.default.authenticate("google-token"), function (req, res) {
    var user = req.user;

    var token = generateAccessToken(user._id);
    return res.json({ token: token, user: user });
  });

  _winston2.default.info("Initiated Google token login auth!");
}

function initFacebook(app) {
  var _config$socialAuth$fa = _config2.default.socialAuth.facebook,
      clientID = _config$socialAuth$fa.clientID,
      clientSecret = _config$socialAuth$fa.clientSecret,
      callbackURL = _config$socialAuth$fa.callbackURL;

  var profileFields = ["id", "email", "gender", "link", "locale", "name", "timezone", "updated_time", "verified"];
  _passport2.default.use(new _passportFacebook.Strategy({ clientID: clientID, clientSecret: clientSecret, callbackURL: callbackURL, profileFields: profileFields }, function (accessToken, refreshToken, profile, next) {
    _User2.default.upsertFacebookUser(accessToken, refreshToken, profile).then(function (user) {
      return next(null, user);
    }).catch(function (err) {
      return next(createError(400));
    });
  }));

  app.get("/auth/facebook", _passport2.default.authenticate("facebook", { scope: "email" }));

  app.get("/auth/facebook/callback", function (req, res, next) {
    _passport2.default.authenticate("facebook", function (err, user, info) {
      if (err) {
        return next(err);
      }
      var token = generateAccessToken(user._id);
      console.log("Token=" + token);
      return res.json({ token: token });
    })(req, res, next);
  });

  _winston2.default.info("Initiated Facebook login auth!");
}

function initFacebookToken(app) {
  // TODO ------------------------------------
  _winston2.default.info("Initiated Facebook token login auth!");
}

/**
 * Use this to protect endpoints which need authentication.
 */
var ensureAuth = exports.ensureAuth = _passport2.default.authenticate("jwt", { session: false });

/**
 * Initializes social authentication using passport
 * @param {Object} app
 */
function initPassport(app) {
  initCore(app);
  initGoogle(app);
  initGoogleToken(app);
  initFacebook(app);
  // initFacebookToken(app);
}