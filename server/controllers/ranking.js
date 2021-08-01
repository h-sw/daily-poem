const RANKING = require("../models/ranking")

exports.read = async (req, res, next) => {
  try {
    const resultPoem = await RANKING.read();
    
    let poems = resultPoem;
    let idx = 0;

    for(const poem of poems){
      const resultReply = await KEYWORD.readReply(poem.poemId); 
      poems[idx]["replyList"] = resultReply;
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

exports.readWeekly = async (req, res, next) => {
  try {
    const resultPoem = await RANKING.readWeekly();

    let poems = resultPoem;
    let idx = 0;

    for(const poem of poems){
      const resultReply = await KEYWORD.readReply(poem.poemId); 
      poems[idx]["replyList"] = resultReply;
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
    const resultPoem = await RANKING.readMonthly();
    
    let poems = resultPoem;
    let idx = 0;

    for(const poem of poems){
      const resultReply = await KEYWORD.readReply(poem.poemId); 
      poems[idx]["replyList"] = resultReply;
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
    const resultPoem = await RANKING.readYearly();
    
    let poems = resultPoem;
    let idx = 0;

    for(const poem of poems){
      const resultReply = await KEYWORD.readReply(poem.poemId); 
      poems[idx]["replyList"] = resultReply;
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