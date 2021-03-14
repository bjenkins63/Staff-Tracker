const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}


Role.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: 'employee',
            key: 'employee_id',
            unique: false
    },
    title: {
        type: DataTypes.STRING,
        allowNULL: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNULL: false,
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        references: {
            model: 'department',
            key: 'department_id',
            unique: false
        }
    }
}
},
{
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
  }
);

module.exports = Role;