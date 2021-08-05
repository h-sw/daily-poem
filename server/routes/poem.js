var express = require('express');
var router = express.Router();
var poem = require("../controllers/poem");

//CRUD   create -> post     read -> get      update -> put     delete -> delete
//get, delete --> body 가질 수 없음
//put, post ---> body를 가질 수 있음

router.post('/', poem.create);

router.delete('/:poemId', poem.deletePoem);

router.post('/:poemId/reply', poem.createReply);

router.delete('/:poemId/reply/:replyId', poem.deleteReply);

router.post('/:poemId/like', poem.like);

router.post('/:poemId/likeReply', poem.likeReply);

router.post('/:poemId/report', poem.report);

router.post('/:poemId/report/:replyId', poem.reportReply);

router.get('/:poemId/read',poem.read);

router.get('/:replyId/readReply',poem.readReply);

module.exports = router;