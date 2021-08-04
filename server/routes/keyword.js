var express = require('express');
var router = express.Router();
var keyword = require("../controllers/keyword");

router.get('/', keyword.read);
router.get('/dailyKeyword', keyword.dailyKeyword);
router.get('/:keyword', keyword.readKeyword);
module.exports = router;