"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Departments", {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                autoIncrement: true,
                primaryKey: true,
            },
        
            name: {
                type: varchar(20),
                allowNULL: false,
            }
        });
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.dropTable("departments");
        }
    };