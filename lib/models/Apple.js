const pool = require('../utils/pool');

class Apple {
  id;
  name;
  color;
  feature;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.feature = row.feature;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM apples;
      `
    ); return rows.map((row) => new Apple(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM apples WHERE id = $1
      `, [id]
    ); if (rows.length === 0) {
      return null;
    } return new Apple(rows[0]);
  }

  static async insert({ name, color, feature }) {
    const { rows } = await pool.query(
      `INSERT INTO apples (name, color, feature)
      VALUES ($1, $2, $3)
      RETURNING * `,
      [name, color, feature]
    );

    return new Apple(rows[0]);
  }
  
}

module.exports = { Apple };
