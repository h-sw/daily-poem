var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var pool = require("./lib/pool");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const subject_dit = {
  '바나나' : 0,
  '복숭아' : 1,
  '청포도' : 2,
  '산딸기' : 3,
  '코코넛' : 4,
  '두리안' : 5,
  '무화과' : 6,
  '오렌지' : 7,
  '토마토' : 8,
  '한라봉' : 9,
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/all', async (req, res, next) => {
  try {
    const sqlAll = `
      SELECT distinct word
      FROM project1.POEM;
    `
    const resultAll = await pool.query(sqlAll);
    
    let all = resultAll[0];
    console.log("all:",all)
    res.json({ code: 200, result: "success", data : all });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.get('/MainLike', async (req, res, next) => {
  try {
    const sqlPoem = `
      SELECT * 
      FROM POEM 
      WHERE DATE_FORMAT(created, "%Y-%m-%d")=current_date()
      ORDER BY likes desc
    `
    const resultPoem = await pool.query(sqlPoem);
    
    let poems = resultPoem[0];
    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `

      const resultReply = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply[0]

      idx += 1;
    }

    console.log(poems)

    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.get('/MainLatest', async (req, res, next) => {
  try {
    const sqlPoem = `
      SELECT *
      FROM POEM 
      WHERE DATE_FORMAT(created, "%Y-%m-%d")=current_date()
      ORDER BY created desc
    `
    const resultPoem = await pool.query(sqlPoem);
    
    let poems = resultPoem[0];
    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `

      const resultReply = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply[0]

      idx += 1;
    }
    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.get('/RankingWeekly', async (req, res, next) => {
  try {
    const sqlPoem = `
      SELECT * 
      FROM POEM 
      WHERE YEARWEEK(created) = YEARWEEK(now())
      ORDER BY likes desc
    `  
    const resultPoem = await pool.query(sqlPoem);
    
    let poems = resultPoem[0];
    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `

      const resultReply2 = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply2[0]

      idx += 1;
    }

    //console.log(poems)

    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.get('/RankingMonthly', async (req, res, next) => {
  try {
    const sqlPoem = `
      SELECT * 
      FROM POEM 
      WHERE DATE_FORMAT(created, '%m')=MONTH(current_date())
      ORDER BY likes desc
    `
    const resultPoem = await pool.query(sqlPoem);
    
    let poems = resultPoem[0];
    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `

      const resultReply3 = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply3[0]

      idx += 1;
    }

    //console.log(poems)

    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.get('/RankingYearly', async (req, res, next) => {
  try {
    const sqlPoem = `
      SELECT * 
      FROM POEM 
      WHERE DATE_FORMAT(created, '%Y')=YEAR(current_date()) 
      ORDER BY likes desc
    `
    const resultPoem = await pool.query(sqlPoem);
    
    let poems = resultPoem[0];
    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `

      const resultReply4 = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply4[0]

      idx += 1;
    }

    //console.log(poems)

    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.get('/notice', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM notice;')
    console.log(result[0])
    res.json({ code: 200, result: "success", data : result[0] });
  }
  catch(e) {
    res.json({ code: 500, result: "error", message: e.message });
  }
});
app.get('/HOfPage', async (req, res, next) => {
  try {
    const sqlHof = `
      SELECT * 
      FROM hof
    `
    const resultHof = await pool.query(sqlHof);
    
    let hofs = resultHof[0];
    let idx = 0;
    //console.log("hofs: ", hofs);
    res.json({ code: 200, result: "success", data : hofs });
  }
  catch(e) {
    res.json({ code: 500, result: "error", message: e.message });
  }
});

/* app.get('/ranking/:poemId', async (req, res, next) => {
  const { poemId } = req.params;
  const subjectId = subject_dit[ poemId ];
 
  console.log("req.params", req.params);
  console.log("subjectId : ", subjectId);
  try {
    const sqlPoem = `
      SELECT * 
      FROM POEM
      WHERE subjectId = ? 
      ORDER BY likes desc
    `  
    const resultPoem = await pool.query(sqlPoem, [
      subjectId
    ]);
    
    let poems = resultPoem[0];
    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `
      const resultReply2 = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply2[0]
      idx += 1;
    }
    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    res.json({ code: 500, result: "error", message: e.message });
  }
}); */

app.get('/all/:keyword', async (req, res, next) => {
  const { keyword } = req.params;

  try {
    const sqlPoem = `
      SELECT * 
      FROM POEM
      WHERE word = ? 
      ORDER BY likes desc
    `  
    const resultPoem = await pool.query(sqlPoem, [
      keyword
    ]);
    let poems = resultPoem[0];

    let idx = 0;

    for(const poem of resultPoem[0]){
      const sqlReply = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `
      const resultReply2 = await pool.query(sqlReply, [
        poem.poemId
      ])
      
      poems[idx]["replyList"] = resultReply2[0]
      idx += 1;
    }
    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.post('/postPoem', async (req, res, next) => {
  let {id, pwd, word, poem_1, poem_2, poem_3}=req.body;
  
  try {
    const sql=`INSERT INTO POEM 
      SET name=?, password=?, word=?, poem_1=?, poem_2=?, poem_3=?, likes=0, comment=0;
    `

    const post = await pool.query(sql, [
      id, pwd, word, poem_1, poem_2, poem_3
    ])

    console.log(post);
    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.post('/postReply', async (req, res, next) => {
  
  let {poemId, id, pwd, reply}=req.body;
  try {
    /* 댓글 업로드 부분 */
    const sql=`INSERT INTO REPLY 
    SET poemId=?, name=?, password=?, reply=?;
    `

    const post = await pool.query(sql, [
      poemId, id, pwd, reply
    ])
    //console.log(post)

    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
  try{
    /* 댓글 몇 개인지 세고 업데이트 하는 부분 */
    const sql_poemId = `
      SELECT COUNT(poemId) FROM REPLY 
      WHERE poemId = ?;
    `
    
    const post_comment = await pool.query(sql_poemId, [
      poemId
    ])

    const count_comment = parseInt(Object.values(post_comment[0][0]))

    const sql_set_comment = `
      UPDATE POEM SET comment = ? WHERE poemId = ?;
    `
    const post_com_n_pi = await pool.query(sql_set_comment, [
      count_comment, poemId
    ])
    res.json({ code: 200, result: "success_post_comment", data : post_com_n_pi });
  }
  catch(e){
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.post('/deletePoem', async (req, res, next) => {

  let {id, name, pwd}=req.body;
  try {
    //댓글도 삭제
    const rpySql = `DELETE FROM REPLY WHERE poemId=?;`

    const rpyPost = await pool.query(rpySql, [id]);

    //시 삭제
    const sql=`DELETE FROM POEM 
      WHERE poemId = ? AND name=? AND password=?;
    `
    const post = await pool.query(sql, [
      id, name, pwd
    ])
    
    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.post('/deleteReply', async (req, res, next) => {

  let {id, rpyId, name, pwd}=req.body;
  try { 
    const sql=`DELETE FROM REPLY 
      WHERE replyId = ? AND name=? AND password=?;
    `
    const post = await pool.query(sql, [
      rpyId, name, pwd
    ])
    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
  try {
     //댓글 수 감소
     const sql_poemId = `
     SELECT COUNT(poemId) FROM REPLY WHERE poemId = ?
     `
     const post_comment = await pool.query(sql_poemId, [
       id
      ])
 
     const count_comment = parseInt(Object.values(post_comment[0][0]))
 
     const sql_set_comment = `
       UPDATE POEM SET comment = ? WHERE poemId = ?
     `
     const post_com_n_pi = await pool.query(sql_set_comment, [
       count_comment, id
     ])
     
     res.json({ code: 200, result: "success_post_comment", data : post_com_n_pi });
  }
  catch(e) {
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.post('/postLike', async (req, res, next) => {
  
  let {likes, poemId}=req.body;
  try {
    const sql=`UPDATE POEM 
    SET likes=? WHERE poemId = ?;
    `
    const post = await pool.query(sql, [
      likes, poemId
    ])
    //console.log(post)

    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

app.post('/Report', async (req, res, next) => {
  
  let {replyId, poemId, reason} = req.body;
  try {
    const sql=`INSERT INTO manage 
    SET replyId=?, poemId=?, reason=?;
    `
    const post = await pool.query(sql, [
      replyId, poemId, reason
    ])
    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
