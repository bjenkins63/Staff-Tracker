const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

// create fields/columns for Location model
Department.init(
    
    {
    id: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNULL: false,
    }
},

    {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department'
      }
    );
    
    module.exports = Department;
