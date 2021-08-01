var express = require('express');
var router = express.Router();

//CRUD   create -> post     read -> get      update -> put     delete -> delete
//get, delete --> body 가질 수 없음
//put, post ---> body를 가질 수 있음

router.post('/', async (req, res, next) => {
  let { id, pwd, word, poem_1, poem_2, poem_3 }=req.body;
  
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


router.delete('/:poemId', async (req, res, next) => {
  //2 가지

  //삭제 여부를 검증하는 라우터를 추가
  //id랑 name을 query에 넣는 방법 ?id=akk123&pw=123903123312

  //url 노출이 안됨
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

router.post('/:poemId/reply', async (req, res, next) => {

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

router.delete('/:poemId/reply/:replyId', async (req, res, next) => {

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

router.post('/:poemId/like', async (req, res, next) => {
  
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

router.post('/:poemId/report', async (req, res, next) => {
  //들어오는 요청을 가공
  let { replyId, poemId, reason } = req.body;


  try {

    //요청을 쿼리로 보내고
    const sql=`INSERT INTO manage 
    SET replyId=?, poemId=?, reason=?;
    `

    //DB에서 데이터를 받아와서
    const post = await pool.query(sql, [
      replyId, poemId, reason
    ])

    //응답을 보낸다
    res.json({ code: 200, result: "success", data : post });
  }
  catch(e) {
    console.log(e)
    res.json({ code: 500, result: "error", message: e.message });
  }
});


module.exports = router;