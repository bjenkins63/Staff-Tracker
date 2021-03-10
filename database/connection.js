const Sequelize = require("sequelize");

const sequelize = new Sequelize("staff_tracker", 'root', '', { 
    host: '127.0.0.1', 
    dialect: "mysql", 
});

module.exports = sequelize;
global.sequelize = sequelize;



