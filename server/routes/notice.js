var express = require('express');
var router = express.Router();
var notice = require("../controllers/notice")

router.get('/', notice.read );

module.exports = router;