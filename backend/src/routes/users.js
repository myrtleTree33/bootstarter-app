import express from 'express';
import passport from 'passport';

import { ensureAuth } from '../plugins/social';

let router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

// router.get("/user", passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ status: req.user });
// });

export default router;
