const Sequelize = require('sequelize');

// Create a connection object
const sequelize = new Sequelize(
  'management_db',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
