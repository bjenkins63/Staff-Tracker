import Sequelize from "sequelize";
const sequelize = require('./database/management_db');

module.exports = sequelize.define("employees", {

    employee_id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
    },

    first_name: {
        type: Sequelize.STRING(20),
        allowNULL: false,
    },

    last_name: {
        type: Sequelize.STRING(20),
        allowNULL: false,
    },

    role_id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
    },

    manager_id: {
        type: Sequelize.INTEGER,
        allowNULL: true,
    },
});