const Sequelize = require("sequelize");
const inquirer = require("inquirer");
const mysql = require("mysql2");

//connect to db
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  PORT: 3306,
  password: "Bernie2020",
  database: "management_db",
});

connection.connect((err) => {
    if (err) throw err;
    start();
  });
  
const start = () => {   
inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View Details for All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add Department",
            "Add Role",
            "Exit"
        ],
    })

    .then(async (answer) => {
        switch (answer.action.toLowerCase()) {

        case "view all employees": {
            await viewAllEmployees();
            break;}

        case "view all employees by department": {
            await obtainEmployeesByDepartment();
            break;}

        case "view details for all employees": {
            await viewAllEmployeesDetails();
            break;}

        case "view all department": {
            await viewAllDepartments();
            break;}

        case "view all roles": {
            await viewAllRoles();
            break;}

        case "add employee": {
            const newHire = await addEmployee();
            console.log(newHire);
            await insertEmployee(newHire);
            break;}

        case "remove employee": {
            const newHire = await ascquireSlashHireInfo();
            await slashHire(eject);
            break;}

        case "update employee role": {
            const updateRole = await updateEmployeeRole();
            await updateEmpRole(updateRole);
            break;}

        case "add department": {
            const departmentAdd = await addDepartment();
            await acquireDepartmentInfo(departmentAdd);
            break;}

        case "add role": {
            const newHire = await addRole();
            await insertEmployee(roleAdd);
            break;}

        case "exit": 
            connection.end();
            break;

        default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

async function addEmployee () {
    const managers = await obtainManagerNames();
    const roles = await obtainRoles();
    return inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter first name of employee: "
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter last name of employee: "
        },
        {
            type: "list",
            message: "Assign manager (if): ",
            name: "manager",
            choices: [
                ...managers, "null"
            ]
        }
    ])
};

//delete employee
async function slashHire () {
    const employees = await acquireEmployeeRoster();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Select employee to hack.",
            name: "employee",
            choices: [
                ...employees, "null"
            ]
        }
    ]);
};

//update employee role
async function updateEmployeeRole () {
    const roster = await acquireEmployeeRoster();
    const roles = await obtainRoles();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Select employee to update role",
            name: "employee",
            choices: [
                ...roster
            ]
        },
        {
            type: "list",
            message: "Select employee's new role",
            name: "employee",
            choices: [
                ...roles
            ]
        }
    ])
};

//add department
async function addDepartment () {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter new department name", 
            name: "departmentName"
        }
    ])
};

//add role
async function addRole () {
    const depts = await obtainDepartmentNames();
    console.log(depts)
    return inquirer.prompt ([
        {
            type: "input",
            message: "Enter title of new role",
            name: "role"
        },
        {
            type: "input",
            message: "which department will this role be in?",
            name: "departmentName",
            choices: [
                ...depts
            ]
        }
    ])
}

//view all employees
async function viewAllEmployees () {
    const query = 'SELECT * FROM employee';
    const rows = await connection.promise().query(query);
    // console.table(rows)
    console.table(rows[0]);
    return Promise.resolve()
    
    ;}

  

//add role
async function addRole (roleInformation) {
    const departmentId = await obtainDepartmentId(roleInformation.departmentId);
    const salary = roleInformation.salary;
    const role = roleInformation.roleName;
    const query = `INSERT into Role (role, salary, department_id) VALUES (?, ?, ?)`;
    const args = [role, salary, departmentId];
    await connection.promise().query(query, args);
    console.table(rows[1]);
    return Promise.resolve();
};

//get employee names
async function updateEmployeeRole(info) {
    console.table(info)
    const roleId = await obtainRoleId(info.role);
    const employee = employeeRoster(ingo.employee);
    const query = `UPDATE employee SET role_id = ? WHERE employee.first_name = ? AND employee.last_name = ?`;
    const args = [roleId, employee[0], employee[1]];
    await connection.promise().query(query, args);
    console.log(`updated ${employee[0]} ${employee[1]} with a new Role: ${info.role}`)
};

//add department
async function acquireDepartmentInfo (departmentInfo) {
    const departmentName = departmentInfo.department.name;
    const query = `INSER into Department (name) VALUES (?)`;
    const args = [departmentName];
    const rows = await connection.promise().query(query, args);
    console.table(rows[0])
    return Promise.resolve();
}

//get employee names
async function acquireEmployeeRoster () {
    const query = `SELECT * FROM employee`;
    const rows = await connection.promise().query(query);
    let name = [];
    for (const employee of rows) {
        names.push(`${employee.first_name} ${employee.last_name}`);
    }
    console.table(rows[0])
    return Promise.resolve();};

//view all departments
async function viewAllDepartments () {
    const query = `SELECT is AS 'ID', name AS 'Department' FROM department`;
    const rows = await connection.promise().query(query);
    // console.table(rows)
    console.table(rows[0])
    return Promise.resolve();
};

//get roles
async function viewAllRoles () {
    const query = `SELECT Role FROM Role`;
    const rows = await connection.promise().query(query);
    let roles = [];
    console.log(roles)
    console.log(rows)
    for(const row of rows) {
        roles.push(row.role)
    }
    return roles;
};

//view all roles
async function obtainAllRoles () {
    const query = `SELECT id AS 'ID', title AS 'Title', salary AS 'salary' FROM Role`;
    const rows = await connection.query(query);
    console.table(rows)
};

//get manager names
async function obtainManagerNames () {
    const query = `SELECT * FROM employee WHERE Manager id IS NULL`;
    const rows = await connection.query(query);
    console.log(employee)
    console.log(employeeNames)
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(`${employee.first_name} ${employee.last_name}`)
    }
    return employeeNames
};

//view details for all employees
async function viewAllEmployeesDetails () {
    console.log('\n')
    const query = `SELECT employee.id AS 'ID',
        first_name AS 'First Name',
        last_name AS 'Last Name',
        Role.role AS 'Title',
        Department.name AS 'Department',
        role_salary AS 'Salary',
        manager_id AS 'Manager ID',
    FROM employee, role, Department
    WHERE employee.role_id = role.id
    AND role.department_id = department.id
    ORDER BY employee.id ASC`;
    const rows = await connection.query(query);
    console.table(rows[0])
};

//view all employees by department
async function obtainEmployeesByDepartment () {
    console.log('\n')
    const query = `SELECT first_name AS 'First Name',
        last_name AS 'Last Name',
        department.name AS 'Department Name' FROM
        ((employee INNER JOIN Role ON role_id = role.id)
        INNER JOIN Department ON department_id = department.id)
        ORDER BY employee.id ASC`;
        const rows = await connection.query(query);
        console.table(rows[0]);
};

//get department names
async function obtainDepartmentNames () {
    const query = `SELECT name FROM Department`;
    const rows = await connection.query(query);
    let departments = [];
    console.log(rows)
    for (const row of rows) {
        departments.push(row.name)
    }
    return departments
};

//get employee ID
async function obtainEmployeeId (employeeName) {
    if (employeeName === 'None') {
        return null
    }
    const firstName = employeeName.split(' ')[0];
    const lastName = employeeName.split(' ')[1];
    const query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
    const rows = await connection.query(query, [firstName, lastName], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            return rows[0].id
        }
    })
};

//get department by id
async function obtainDepartmentId (departmentName) {
    const query = `SELECT * FROM Department WHERE Department.name = ?`;
    const args = [departmentName];
    const rows = await connection.query(query, args);
    return rows[0].id
};

//retrieve employee roster
const employeeRoster = (name) => {
    console.log(name)
    let staff = name.split(' ');
    return staff;
};
