// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_db', 'test_user', 'test_password', {
  host: 'db',
  dialect: 'postgres',
  
  port: 5432,
});

sequelize.sync({});
module.exports = sequelize;

