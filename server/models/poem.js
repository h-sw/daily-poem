const pool = require("../lib/pool");

class Poem {
  async create ( poem ){
    try{
      const sql=`
        INSERT INTO POEM 
        SET name=?, 
        password=?, 
        word    =?, 
        poem_1  =?, 
        poem_2  =?, 
        poem_3  =?, 
        likes   =0, 
        comment =0;
      `
      const result = await pool.query(sql, [
        poem.id, 
        poem.pwd, 
        poem.word, 
        poem.poem_1, 
        poem.poem_2, 
        poem.poem_3
      ]);
      return result[0];
    }catch(err) {
      throw err;
    }
  }

  async deletePoem ( id, name, pwd ){
    try{
      //댓글도 삭제
		  const sqlReply = `
        DELETE FROM REPLY 
        WHERE poemId = ?;
			`
			const resultReply = await pool.query(sqlReply, [
				id
			]);

			//시 삭제
			const sql=`DELETE FROM POEM 
				WHERE poemId = ? 
        AND name=? 
        AND password=?;
			`
			const result = await pool.query(sql, [
				id, name, pwd
			]);
			return result[0];
		}catch(err) {
      throw err;
    }
  }

	async createReply( poemId, id, pwd, reply ){
		try{
			/* 댓글 업로드 부분 */
			const sql=`INSERT INTO REPLY 
				SET poemId=?, 
				name=?, 
				password=?, 
				reply=?;
			`
			const result = await pool.query(sql, [
				poemId, id, pwd, reply
			])
			return result[0];
		}catch(err) {
      throw err;
    }  
	}

  async countReply( poemId ){
    try{
      /* 댓글 몇 개인지 세고 업데이트 하는 부분 */
      const sql = `
        SELECT COUNT(poemId) 
        FROM REPLY 
        WHERE poemId = ?;
      `
      const result = await pool.query(sql, [
        poemId
      ]);
      return parseInt(Object.values(result[0][0]));
		}catch(err) {
      throw err;
    } 
  }

  async updateReply( numberOfReply, poemId ){
    try{
      const sql = `
        UPDATE POEM 
        SET comment = ? 
        WHERE poemId = ?;
      `
      const result = await pool.query(sql, [
        numberOfReply, poemId
      ]);
      return result[0];
    }catch(err){
      throw err;
    }
  }

  async deleteReply( rpyId, name, pwd ){
    try{
      const sql=`
        DELETE FROM REPLY 
        WHERE replyId = ? 
        AND name=? 
        AND password=?;
      `
      const result = await pool.query(sql, [
        rpyId, name, pwd
      ]);
      return result[0];
    }catch(err) {
      throw err;
    }
  }

  async createLike( likes, poemId ){
    try{
      const sql=`
        UPDATE POEM 
        SET likes=? 
        WHERE poemId = ?;
      `
      const result = await pool.query(sql, [
        likes, poemId
      ])
      return result[0];
    }catch(err) {
      throw err;
    }
  }

  async createReport( replyId, poemId, reason ){
    try{
      //요청을 쿼리로 보내고
      const sql=`INSERT INTO manage 
        SET replyId=?, poemId=?, reason=?;
      `
      //DB에서 데이터를 받아와서
      const post = await pool.query(sql, [
        replyId, poemId, reason
      ])
      return result[0];
    }catch(err) {
      throw err;
    }
  }
};

module.exports = new Poem();