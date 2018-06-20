import logger from "winston";
import passport from "passport";
// import cookieParser from "cookie-parser";
// import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-auth";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleTokenStrategy } from "passport-google-token";
import passportJwt from "passport-jwt";
import jwt from "jsonwebtoken";

import config from "../../config";
import User from "../models/User";

// TODO implement JWT
// check out https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
// TODO https://www.sitepoint.com/spa-social-login-google-facebook/

function generateAccessToken(userId) {
  const secret = config.socialAuth.jwt.secret;
  const token = jwt.sign({}, secret, {
    expiresIn: "1h",
    audience: config.socialAuth.jwt.audience,
    issuer: config.socialAuth.jwt.issuer,
    subject: userId.toString()
  });
  return token;
}

/**
 * Initializes passport using server-based storage (sessions)
 *
 * @param {*} app
 */
function initCore(app) {
  app.use(passport.initialize());
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  // set JWT options
  const jwtOptions = {
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.socialAuth.jwt.secret,
    issuer: config.socialAuth.jwt.issuer,
    audience: config.socialAuth.jwt.audience
  };

  passport.use(
    new passportJwt.Strategy(jwtOptions, (payload, done) => {
      const userId = payload.sub;
      User.findById(userId)
        .then(user => done(null, user, payload))
        .catch(err => done(err));
    })
  );
}

/**
 * Initializes Google auth strategy
 *
 * @param {Object} app
 */
function initGoogle(app) {
  const { clientID, clientSecret, callbackURL } = config.socialAuth.google;
  passport.use(
    new GoogleStrategy(
      { clientId: clientID, clientSecret, callbackURL },
      (accessToken, refreshToken, profile, next) => {
        User.upsertGoogleUser(accessToken, refreshToken, profile)
          .then(user => next(null, user))
          .catch(err => next(createError(400)));
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );

  app.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        return next(err);
      }
      const token = generateAccessToken(user._id);
      console.log(`Token=${token}`);
      return res.json({ token });
    })(req, res, next);
  });

  logger.info("Initiated Google login auth!");
}

function initGoogleToken(app) {
  const { clientID, clientSecret } = config.socialAuth.google;
  passport.use(
    new GoogleTokenStrategy(
      { clientID, clientSecret: clientSecret },
      (accessToken, refreshToken, profile, next) => {
        User.upsertGoogleUser(accessToken, refreshToken, profile)
          .then(user => next(null, user))
          .catch(err => next(createError(400)));
      }
    )
  );

  app.post(
    "/auth/google/token",
    passport.authenticate("google-token"),
    (req, res) => {
      const { user } = req;
      const token = generateAccessToken(user._id);
      return res.json({ token, user });
    }
  );

  logger.info("Initiated Google token login auth!");
}

function initFacebook(app) {
  const { clientID, clientSecret, callbackURL } = config.socialAuth.facebook;
  const profileFields = [
    "id",
    "email",
    "gender",
    "link",
    "locale",
    "name",
    "timezone",
    "updated_time",
    "verified"
  ];
  passport.use(
    new FacebookStrategy(
      { clientID, clientSecret, callbackURL, profileFields },
      (accessToken, refreshToken, profile, next) => {
        User.upsertFacebookUser(accessToken, refreshToken, profile)
          .then(user => next(null, user))
          .catch(err => next(createError(400)));
      }
    )
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: "email" })
  );

  app.get("/auth/facebook/callback", (req, res, next) => {
    passport.authenticate("facebook", (err, user, info) => {
      if (err) {
        return next(err);
      }
      const token = generateAccessToken(user._id);
      console.log(`Token=${token}`);
      return res.json({ token });
    })(req, res, next);
  });

  logger.info("Initiated Facebook login auth!");
}

function initFacebookToken(app) {
  // TODO ------------------------------------
  logger.info("Initiated Facebook token login auth!");
}

/**
 * Use this to protect endpoints which need authentication.
 */
export const ensureAuth = passport.authenticate("jwt", { session: false });

/**
 * Initializes social authentication using passport
 * @param {Object} app
 */
export default function initPassport(app) {
  initCore(app);
  initGoogle(app);
  initGoogleToken(app);
  initFacebook(app);
  // initFacebookToken(app);
}
