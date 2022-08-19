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
  
  static async updateById(id, newAttrs) {

    const apple = await Apple.getById(id);
    if(!apple) return null;
    const updatedData = { ...apple, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE apples
      SET name = $2, color = $3, feature = $4
      WHERE id = $1
      RETURNING *;
      `, [id, updatedData.name, updatedData.color, updatedData.feature]
    );

    return new Apple(rows[0]);
  }
}

module.exports = { Apple };
