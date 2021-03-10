import Sequelize from "sequelize";
const sequelize = require('./database/staff_tracker');

module.exports = sequelize.define("roles", {

    role_id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: Sequelize.STRING(20),
        allowNULL: false,
    },

    salary: {
        type: Sequelize.INTEGER,
        allowNULL: false,
    },

    department_id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
    },
});