const KEYWORD = require("../models/keyword")

exports.read = async (req, res, next) => {
  try {
    const result = await KEYWORD.read();
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

exports.readKeyword = async (req, res, next) => {
  const { keyword } = req.params;

  try {
    const resultPoem = await KEYWORD.readKeyword(keyword);
    
    let poems = resultPoem;
    let idx = 0;

    for(const poem of resultPoem){
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