import express from 'express';

import { ensureAuth } from "../plugins/social";

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
