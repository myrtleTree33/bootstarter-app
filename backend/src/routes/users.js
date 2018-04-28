var express = require("express");
var router = express.Router();
import { ensureAuth } from "../plugins/social";

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/user", ensureAuth, (req, res) => {
  res.json({ status: req.user });
});

export default router;
