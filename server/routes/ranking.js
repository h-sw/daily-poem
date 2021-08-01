var express = require('express');
var router = express.Router();

router.get('/today', async (req, res, next) => {
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

    console.log(poems);

    res.json({ code: 200, result: "success", data : poems });
  }
  catch(e) {
    //console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});


router.get('/weekly', async (req, res, next) => {
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


router.get('/monthly', async (req, res, next) => {
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


router.get('/yearly', async (req, res, next) => {
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


router.get('/hof', async (req, res, next) => {
  try {
    const sqlHof = `
      SELECT * 
      FROM dailyKeword 
      ORDER BY likes DESC
      LIMIT 10
    `
    const resultHof = await pool.query(sqlHof);
    
    let hofs = resultHof[0];
    let idx = 0;
    res.json({ code: 200, result: "success", data : hofs });
  }
  catch(e) {
    res.json({ code: 500, result: "error", message: e.message });
  }
});

module.exports = router;