const Employee = require('./employee');
const Role = require('./Role');
const Department = require('./Department');

Role.belongsToMany(Department, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Department,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'department_roles'
});

Employee.belongsToMany(Role, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Department,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'department_team'
});


module.exports = { Employee, Role, Department };




