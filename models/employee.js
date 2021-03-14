const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
    },

    first_name: {
        type: DataTypes.STRING,
        allowNULL: false,
    },

    last_name: {
        type: DataTypes.STRING,
        allowNULL: false,
    },

    role_id: {
        type: DataTypes.INTEGER,
        allowNULL: false,      
        // references: {
        //     model: 'role',
        //     key: 'role_id',
        //     unique: false
        // }
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNULL: true,      
        // references: {
        //     model: 'department',
        //     key: 'department_id',
        //     unique: false
        // }
    }
    },  
{
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

module.exports = Employee;