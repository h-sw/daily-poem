const RANKING = require("../models/ranking")
const pool = require("../lib/pool");

exports.read = async (req, res, next) => {
  try {
    const result = await RANKING.read();

    let poems = result;
    let idx = 0;

    for(const poem of poems){
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
    res.json({ 
      code: 200, 
      result: "success", 
      data : result 
    });
  }
  catch(e) {
    res.json({ 
      code: 500, 
      result: "error", 
      message: e.message 
    });
  }
}

exports.readWeekly = async (req, res, next) => {

  try {
    const result = await RANKING.readWeekly();
    
    let poems = result;
    let idx = 0;

    for(const poem of poems){
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
    res.json({ 
      code: 200, 
      result: "success",  
      data : poems
    });
  }
  catch(e) {
    res.json({ 
      code: 500, 
      result: "error", 
      message: e.message 
    });
  }
}
exports.readMonthly = async (req, res, next) => {

  try {
    const result = await RANKING.readMonthly();
    
    let poems = result;
    let idx = 0;

    for(const poem of poems){
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
    res.json({ 
      code: 200, 
      result: "success",  
      data : poems
    });
  }
  catch(e) {
    res.json({ 
      code: 500, 
      result: "error", 
      message: e.message 
    });
  }
}
exports.readYearly = async (req, res, next) => {

  try {
    const result = await RANKING.readYearly();
    
    let poems = result;
    let idx = 0;

    for(const poem of poems){
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
    res.json({ 
      code: 200, 
      result: "success",  
      data : poems
    });
  }
  catch(e) {
    res.json({ 
      code: 500, 
      result: "error", 
      message: e.message 
    });
  }
}
exports.readHof = async (req, res, next) => {
  try {
    const result = await RANKING.readHof();

    res.json({ 
      code: 200, 
      result: "success",  
      data : result
    });
  }
  catch(e) {
    res.json({ 
      code: 500, 
      result: "error", 
      message: e.message 
    });
  }
}