const pool = require("../lib/pool");

class Notice {
  async read () {
    try {
      const sql = `
        SELECT * 
        FROM notice
      `
      const result = await pool.query(sql)
      return result[0];
    }catch(err){
      throw err
    }
  }
}

  

module.exports = new Notice()