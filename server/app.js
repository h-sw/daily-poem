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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/NoticePage', async (req, res, next) => {
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
    console.log("hofs: ", hofs);
    res.json({ code: 200, result: "success", data : hofs });
  }
  catch(e) {
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
