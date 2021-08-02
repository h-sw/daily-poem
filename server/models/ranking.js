const pool = require("../lib/pool");

class Ranking {
  async read (){
    try {
      const sql = `
        SELECT * 
        FROM POEM 
        WHERE DATE_FORMAT(created, "%Y-%m-%d")=current_date()
        ORDER BY likes desc
      `
      const result = await pool.query(sql);
        return result[0];
      }catch(err) {
        throw err;
      }
    }
    async readWeekly (){
      try {
        const sql = `
          SELECT * 
          FROM POEM 
          WHERE YEARWEEK(created) = YEARWEEK(now())
          ORDER BY likes desc
        `  
        const result = await pool.query(sql);
         
        return result[0];
      }catch(err) {
        throw err;
      }
    }
      async readMonthly (){
        try {
          const sql= `
            SELECT * 
            FROM POEM 
            WHERE DATE_FORMAT(created, '%m')=MONTH(current_date())
            ORDER BY likes desc
          `
          const result = await pool.query(sql);
          
          return result[0];
        }catch(err) {
          throw err;
        }
      }
      async readYearly (){
        try {
          const sql = `
            SELECT * 
            FROM POEM 
            WHERE DATE_FORMAT(created, '%Y')=YEAR(current_date()) 
            ORDER BY likes desc
          `
          const result = await pool.query(sql);
          return result[0];
        }catch(err) {
          throw err;
        }
      }
      async readHof (){
        try {
          const sql = `
            SELECT * 
            FROM dailyKeword 
            ORDER BY likes DESC
            LIMIT 10
          `
          const result = await pool.query(sql);
        return result[0];
      }catch(err){
        throw err;
      }
  }
};

module.exports = new Ranking();