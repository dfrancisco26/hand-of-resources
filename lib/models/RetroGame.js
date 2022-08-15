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
  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM retrogames WHERE id = $1
        `, [id]
    ); if (rows.length === 0) {
      return null;
    } return new RetroGame(rows[0]);
  }

  static async insert({ name, genre, release }) {
    const { rows } = await pool.query(
      `INSERT INTO retrogames (name, genre, release)
        VALUES ($1, $2, $3)
        RETURNING * `,
      [name, genre, release]
    );

    return new RetroGame(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const retrogame = await RetroGame.getById(id);
    if (!retrogame) return null;
    const updatedData = { ...retrogame, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE retrogames
        SET name = $2, genre = $3, release = $4
        WHERE id = $1
        RETURNING *; `, [id, updatedData.name, updatedData.genre, updatedData.release]
    );

    return new RetroGame(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM retrogames
      WHERE id=$1 RETURNING *`,
      [id]
    );
    
    return new RetroGame(rows[0]);
  }
  
}

module.exports = { RetroGame }; 
