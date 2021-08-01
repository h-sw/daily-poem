const POEM = require("../models/poem")

//CRUD   create -> post     read -> get      update -> put     delete -> delete
//get, delete --> body 가질 수 없음
//put, post ---> body를 가질 수 있음

exports.create = async (req, res, next) => {
  const { poem } = req.params;
  try {
    const result = await POEM.create( poem );
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

exports.deletePoem = async (req, res, next) => {
  //2 가지

  //삭제 여부를 검증하는 라우터를 추가
  //id랑 name을 query에 넣는 방법 ?id=akk123&pw=123903123312

  //url 노출이 안됨
  let {id, name, pwd}=req.params;
  try {
    const result = await POEM.deletePoem(id, name, pwd);
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

exports.createReply = async (req, res, next) => {
  let {poemId, id, pwd, reply}=req.body;
  try {
    const result = await POEM.createReply(poemId, id, pwd, reply);
    /*댓글 수 업데이트*/
    const numberOfReply = await POEM.countReply(poemId);
    const resultUpdate = await POEM.updateReply(numberOfReply, poemId);
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

exports.deleteReply = async (req, res, next) => {
  let {id, rpyId, name, pwd}=req.params;
  try { 
    const result = await POEM.deleteReply(rpyId, name, pwd);
    /*댓글 수 업데이트*/
    const numberOfReply = await POEM.countReply(id);
    const resultUpdate = await POEM.updateReply(numberOfReply, id);
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

exports.like = async (req, res, next) => {
  let {likes, poemId} = req.body;
  try {
    const result = await POEM.createLike(likes, poemId);
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

exports.report = async (req, res, next) => {
  //들어오는 요청을 가공
  let { replyId, poemId, reason } = req.body;
  try {
    const result = await POEM.createReply(replyId, poemId, reason);
    //응답을 보낸다
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

