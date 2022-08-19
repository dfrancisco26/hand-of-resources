const pool = require('../utils/pool');

class Dog {
  id;
  name;
  age;
  personality;
  rating;


  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.personality = row.personality;
    this.rating = row.rating;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * FROM dogs;
        `
    );
    return rows.map((row) => new Dog(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM dogs WHERE id = $1', [id]
    ); if (rows.length === 0) {
      return null;
    } return new Dog(rows[0]);
  }
}

module.exports = { Dog };
