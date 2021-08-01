var express = require('express');
var router = express.Router();
var ranking = require('../controllers/ranking');

router.get('/', ranking.read);
router.get('/weekly', ranking.readWeekly);
router.get('/monthly', ranking.readMonthly);
router.get('/yearly', ranking.readYearly);
router.get('/hof', ranking.readHof);

module.exports = router;