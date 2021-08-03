var express = require('express');
var router = express.Router();
var keyword = require("../controllers/keyword");

router.get('/', keyword.read);
router.get('/:keyword', keyword.readKeyword);
router.get('/dailyKeyword', keyword.dailyKeyword);
module.exports = router;