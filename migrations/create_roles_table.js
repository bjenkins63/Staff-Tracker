"use strict";

module.exports = {
        up: (queryInterface, Sequelize) => {
            return queryInterface.createTable("roles", {
                id: {
                    type: Sequelize.INTEGER,
                    allowNULL: false,
                    autoIncrement: true,
                    primaryKey: true,
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
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.dropTable("roles");
        }
    };
