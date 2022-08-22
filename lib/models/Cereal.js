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

  static async insert({ name, organic, brand }) {
    const { rows } = await pool.query(
      `INSERT INTO cereals (name, organic, brand)
        VALUES ($1, $2, $3)
        RETURNING * `,
      [name, organic, brand]
    );

    return new Cereal(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const cereal = await Cereal.getById(id);
    if (!cereal) return null;
    const updatedData = { ...cereal, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE cereals 
        SET name = $2, organic = $3, brand = $4
        WHERE id = $1
        RETURNING *;`,
      [id, updatedData.name, updatedData.organic, updatedData.brand]
    );

    return new Cereal(rows[0]);
  }
}

module.exports = { Cereal };
