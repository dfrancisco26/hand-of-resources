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
  
  static async getById(id) {
    const { rows } = await pool.query(
      `
          SELECT * from newgames WHERE id = $1
          `, [id]
    ); if (rows.length === 0) {
      return null;
    } return new NewGame(rows[0]);
  }

  static async insert({ name, genre, release }) {
    const { rows } = await pool.query(
      `INSERT INTO newgames (name, genre, release)
      VALUES ($1, $2, $3)
      RETURNING * `,
      [name, genre, release]
    );

    return new NewGame(rows[0]);
  }

  static async updateById(id, newAttrs) {

    const newgame = await NewGame.getById(id);
    if (!newgame) return null;
    const updatedData = { ...newgame, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE newgames
      SET name = $2, genre = $3, release = $4
      WHERE id = $1
      RETURNING *;
      `,
      [id, updatedData.name, updatedData.genre, updatedData.released]
    );

    return new NewGame(rows[0]);
  }

}


module.exports = { NewGame };
