var express = require('express');
var router = express.Router();

/* GET epoch time. */
router.get('/', function (req, res, next) {
  res.json({ epoch: new Date().getTime() });
});

module.exports = router;
