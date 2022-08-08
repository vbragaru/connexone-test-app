var express = require('express');
var router = express.Router();

/* GET epoch time. */
router.get('/', function (req, res, next) {
  res.json({ epoch: Math.floor(new Date().getTime() / 1000) });
});

module.exports = router;
