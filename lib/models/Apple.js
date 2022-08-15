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
}

module.exports = { Apple };
