"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("employees", {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                autoIncrement: true,
                primaryKey: true,
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
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.dropTable("employees");
        }
    };