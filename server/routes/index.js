var express = require('express');
var router = express.Router();
var keyword = require("./keyword")
var notice = require("./notice")
var poem = require("./poem")
var ranking = require("./ranking")

/* GET home page. */
router.get('/', function(req, res, next) {
  
});

router.use('/keyword', keyword);
router.use('/notice', notice)
router.use('/poem', poem);
router.use('/ranking', ranking);


module.exports = router;
