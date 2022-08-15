const pool = require('../utils/pool');

class RetroGame {
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
      SELECT * FROM retrogames;
      `
    ); return rows.map((row) => new RetroGame(row));
  }

}

module.exports = { RetroGame }; 
