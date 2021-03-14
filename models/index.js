const Employee = require('./employee');
const Role = require('./Role');
const Department = require('./Department');

Employee.hasOne(Department, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

// An employee can have several roles
Employee.hasMany(Role, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

// A book belongs to a single reader
Role.belongsToMany(Employee, {
  foreignKey: 'employee_id',
});

 // A role belongs to a single department
Role.hasOne(Department, {
  foreignKey: 'department_id',
});

Department.hasMany(Role, {
  foreignKey: 'role_id',
});

Department.hasMany(Employee, {
  foreignKey: 'employee_id',
});


module.exports = { Employee, Role, Department };
