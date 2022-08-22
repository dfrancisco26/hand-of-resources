const pool = require('../utils/pool');

class Cereal {
  id;
  name;
  organic;
  brand;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.organic = row.organic;
    this.brand = row.brand;
  }

  static async getAll() {
    const { rows } = await pool.query(
      ' SELECT * FROM cereals'
    );
    return rows.map((row) => new Cereal(row));
  }
}

module.exports = { Cereal };
