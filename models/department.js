const Sequelize = require('sequelize');
const sequelize = require('/database/staff_tracker');

module.exports = sequelize.define("departments", {
    id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: varchar(20),
        allowNULL: false,
    },
});

return Department;
