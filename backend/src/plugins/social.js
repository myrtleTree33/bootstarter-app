import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-auth";

import config from "../../config";
import User from "../models/User";


/**
 * Initializes passport using server-based storage (sessions)
 * 
 * @param {*} app 
 */
function initCore(app) {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  app.use(cookieParser());
  app.use(
    session({
      secret: config.socialAuth.session.secret,
      name: config.socialAuth.session.name,
      // 	store:  new redisstore({
      // 		host: config.socialAuth.session.redis.host,
      // 		port: config.socialAuth.session.redis.port
      // 	}),
      proxy: true,
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

/**
 * Initializes Google auth strategy
 *
 * @param {Object} app
 */
function initGoogle(app) {
  passport.use(
    new GoogleStrategy(
      {
        clientId: config.socialAuth.google.clientId,
        clientSecret: config.socialAuth.google.clientSecret,
        callbackURL: config.socialAuth.google.callbackURL
      },
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

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/auth/google"
    })
  );
}

/**
 * Use this middleware for protected routes needing authentication.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function ensureAuthenticated(req, res, next) {
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

  // TODO remove this test route when not needed.
  app.get("/user", ensureAuthenticated, (req, res) => {
    res.json({ status: req.user });
  });
}

export default initPassport;
