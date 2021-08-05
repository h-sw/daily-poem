const pool = require("../lib/pool");

class Keyword {
  async read (){
    try{
      const sql = `
        SELECT keyword, createTime
        FROM keyword
        WHERE DATE_FORMAT(createTime, '%Y-%m-%d')
          <= DATE_FORMAT(now(), '%Y-%m-%d')
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
        SELECT keyword, createTime
        FROM keyword
        WHERE DATE_FORMAT(createTime, '%Y-%m-%d')
          = DATE_FORMAT(now(), '%Y-%m-%d')
      `
      const result = await pool.query(sql);
      return result[0];
    }catch(err) {
      throw err;
    }
  }
};

module.exports = new Keyword();