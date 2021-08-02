const NOTICE = require("../models/notice")

exports.read = async (req, res, next) => {
  try {
    const result = await NOTICE.read()
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