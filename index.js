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

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
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
                    break;
                }

                case "view all departments": {
                    await viewAllDepartments();
                    break;
                }

                case "view all roles": {
                    await viewAllRoles();
                    break;
                }

                case "add employee": {
                    const newHire = await promptAddEmployee();
                    console.log(newHire);
                    await insertEmployee(newHire);
                    break;
                }

                case "remove employee": {
                    const slashHire = await SlashHire();
                    await slashHire(eject);
                    break;
                }

                case "update employee role": {
                    const updateRole = await updateEmployeeRole();
                    await updateEmployeeRole(updateRole);
                    break;
                }

                case "add department": {
                    const departmentAdd = await addDepartment();
                    await acquireDepartmentInfo(departmentAdd);
                    break;
                }

                case "add role": {
                    const newRole = await addRole();
                    await insertEmployee(roleAdd);
                    break;
                }

                case "exit":
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
}

//view all employees
async function viewAllEmployees () {
    const query = 'SELECT * FROM employee';
    const rows = await connection.promise().query(query);
    console.table(rows[0])
    return Promise.resolve()
    .then(start);
};

//add employee
async function promptAddEmployee () {
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
            type: "input",
            name: "role_id",
            message: "Enter role ID"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter department manager ID"
        },
    ])
    .then(start);
    
};


//update employee role
async function updateEmployeeRole () {
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Select employee to update role",
            name: "employee",
            choices: [
                ...roster
            ]},
        {
            type: "list",
            message: "Select employee's new role",
            name: "employee",
            choices: [
                ...roles
            ]},
            
 ]);
}

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
            ]}
            .then.viewAllEmployees()
    ]);
};

//view all departments
async function viewAllDepartments () {
    const query = `SELECT * FROM department`;
    const rows = await connection.promise().query(query);
    // console.table(rows)
    console.table(rows[0])
    return Promise.resolve()
    .then(start);

};

//add department
async function addDepartment () {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "Enter new department name", 
            name: "departmentName"
        }
    ])
};

//view all roles
async function viewAllRoles () {
    const query = `SELECT * FROM role`;
    const rows = await connection.promise().query(query);
    console.table (rows[0]) 
    return Promise.resolve()
    .then(start);

};

//add role
async function addRole () {
    // const depts = await obtainDepartmentNames();
    return inquirer
    .prompt ([
        {
            type: "input",
            message: "Enter title of new role",
            name: "role"
        },
        {
            type: "input",
            message: "Enter salary of new role",
            name: "salary"
            },
        {
            type: "input",
            message: "which department will this role be in?",
            name: "departmentName",
            choices: [
                ...depts
            ]}
            .then(start)

    ])
};

//add role
async function addRole (roleInformation) {
    const departmentId = await obtainDepartmentId(roleInformation.departmentId);
    const salary = roleInformation.salary;
    const role = roleInformation.roleName;
    const query = `INSERT into Role (role, salary, department_id) VALUES (?, ?, ?)`;
    const args = [role, salary, departmentId];
    await connection.promise().query(query, args);
    console.table(rows[0]);
    return Promise.resolve()
    .then(start);

}

connection.connect((err) => {
    if (err) throw err;
    start();
  });
