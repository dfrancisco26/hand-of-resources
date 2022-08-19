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

  static async insert({ name, age, personality, rating }) {
    const { rows } = await pool.query(
      `INSERT INTO dogs (name, age, personality, rating)
        VALUES ($1, $2, $3, $4)
        RETURNING * `, [name, age, personality, rating]
    );

    return new Dog(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const dog = await Dog.getById(id);
    if (!dog) return null;
    const updatedData = { ...dog, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE dogs SET name = $2, age = $3, personality = $4, rating = $5
        WHERE id = $1
        RETURNING *;
        `,
      [id, updatedData.name, updatedData.age, updatedData.personality,
        updatedData.rating]
    );

    return new Dog(rows[0]);
  }
}
module.exports = { Dog };
