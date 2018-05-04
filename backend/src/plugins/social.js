import passport from "passport";
// import cookieParser from "cookie-parser";
// import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-auth";
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

  app.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        return next(err);
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    })(req, res, next);
  });
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
}
