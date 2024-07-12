import { Sequelize } from 'sequelize';

const db = new Sequelize('MealManagement', 'postgres', '12sakib45', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default db;