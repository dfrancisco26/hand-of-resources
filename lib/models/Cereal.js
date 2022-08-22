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

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM cereals WHERE id = $1', [id]
    ); 
    if (rows.length === 0) {
      return null;
    } return new Cereal(rows[0]);
  }
}

module.exports = { Cereal };
