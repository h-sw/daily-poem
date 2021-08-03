const pool = require("../lib/pool");

class Keyword {
  async read (){
    try{
      const sql = `
        SELECT word, date
        FROM dailyKeword
      `
      const result = await pool.query(sql);
      return result[0];
    }catch(err) {
      throw err;
    }
  }

  async readKeyword ( keyword ){
    try{
      const sql = `
        SELECT * 
        FROM POEM
        WHERE word = ? 
        ORDER BY likes desc
      `  
      const result = await pool.query(sql, [
        keyword
      ]);
      return result[0];
    }catch(err) {
      throw err;
    }
  }

  async readReply( poemId ){
    try{
      const sql = `
        SELECT * 
        FROM REPLY
        WHERE REPLY.poemId = ?
      `
      const result = await pool.query(sql, [
        poemId
      ])
      return result[0];
    }catch(err) {
      throw err;
    }
  }

  async dailyKeyword (){
    try{
      const sql = `
        SELECT keyword,createTime
        FROM keyword
      `
      const result = await pool.query(sql);
      console.log("받아옴")
      return result[0];
    }catch(err) {
      throw err;
    }
  }
};

module.exports = new Keyword();