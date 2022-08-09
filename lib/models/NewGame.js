const pool = require('../utils/pool');

class NewGame {
  id;
  name;
  genre;
  release;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.genre = row.genre;
    this.release = row.release;
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      `
          SELECT * FROM newgames;
          `
    ); return rows.map((row) => new NewGame(row));
  }
}
module.exports = { NewGame };
