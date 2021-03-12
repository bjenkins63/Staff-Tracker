const Sequelize = require("sequelize");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");


//connect to db
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  PORT: 3306,
  password: "root",
  database: "management_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connection to database successful.\n");
    uiPrompt();
});

//view all employees
async function viewAllEmployees () {
    const query = 'SELECT * FROM employees';
    const rows = await connection.query(query);
    console.table(rows)
};

//add role
async function addRole (roleInformation) {
    const departmentId = await obtainDepartmentId(roleInformation.departmentId);
    const salary = roleInformation.salary;
    const role = roleInformation.roleName;
    const query = `INSERT into role (role, salary, department_id) VALUES (?, ?, ?)`;
    const args = [role, salary, departmentId];
    await connection.query(query, args);
    console.log(`New role added successfully!`)

};

//get employee names
async function updateEmpRole(info) {
    console.table(info)
    const roleId = await obtainRoleId(info.role);
    const employee = employeeRoster(ingo.employee);
    const query = `UPDATE employee SET role_id = ? WHERE employee.first_name = ? AND employee.last_name = ?`;
    const args = [roleId, employee[0], employee[1]];
    await connection.query(query, args);
    console.log(`updated ${employee[0]} ${employee[1]} with a new role: ${info.role}`)

};

//add department
async function acquireDepartmentInfo (departmentInfo) {
    const departmentName = departmentInfo.department.name;
    const query = `INSER into department (name) VALUES (?)`;
    const args = [departmentName];
    const rows = await connection.query(query, args);
    console.log(`${departmentName} added as new department.`)

}

//get employee names
async function aquireEmployeeRoster () {
    const query = `SELECT * FROM employee`;
    const rows = await connection.query(query);
    let name = [];
    for (const employee of rows) {
        names.push(`${employee.first_name} ${employee.last_name}`);
    }
    return names
};


//view all departments
async function obtainAllDepartments () {
    const query = `SELECT is AS 'ID', name AS 'Department' FROM department`;
    const rows = await connection.query(query);
    console.table(rows);
};


//get roles
async function obtainRoles () {
    const query = `SELECT role FROM role`;
    const rows = await connection.query(query);
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
    const query = `SELECT id AS 'ID', role AS 'Title', salary AS 'salary' FROM role`;
    const rows = await connection.query(query);
    console.table(rows)
};


//get manager names
async function obtainManagerNames () {
    const query = `SELECT * FROM employee WHERE manager id IS NULL`;
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
        role.role AS 'Title',
        department.name AS 'Department',
        role_salary AS 'Salary',
        manager_id AS 'Manager ID',
    FROM employee, role, department
    WHERE employee.role_id = role.id
    AND role.department_id = department.id
    ORDER BY employee.id ASC`;
    const rows = await connection.query(query);
    console.table(rows)

};

//view all employees by department
async function obtainEmployeesByDepartment () {
    console.log('\n')
    const query = `SELECT first_name AS 'First Name',
        last_name AS 'Last Name',
        department.name AS 'Departent Name' FROM
        ((employee INNER JOIN role ON role_id = role.id)
        INNER JOIN department ON department_id = department.id)
        ORDER BY employee.id ASC`;
        const rows = await connection.query(query);
        console.table(rows);
};


//get role ID
async function obtainRoleID (roleName) {
    const query = `SELECT id FROM role WHERE role.role = ?`
    const args = [roleName];
    const rows = await connection.query(query, args);
            return rows[0].id

};


//get department names
async function obtainDepartmentNames () {
    const query = `SELECT name FROM department`;
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
    const query = `SELECT * FROM department WHERE department.name = ?`;
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


//add employee
async function insertEmployee (employee) {
    const roleId = await obtainRoleId(employee.role);
    const managerId = await obtainEmployeeId(employee.role);
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;
    const args = [employee.first_name, employee.last_name, roleid, manageId];
    const rows = await connection.query(query, args, (error) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            console.log(`${employee.first_name} ${employee.last_name} added.`)
            return rows
        }
        });
};

//remove employee
async function slashHire (employeeName) {
    console.log(employeeName)
    const firstName = employeeName.employee.split(' ')[0];
    const lastName = employeeName.employee.split(' ')[1];
    console.log(employeeName)
    query = `DELETE FROM employees WHERE first_name = ? AND last_name = ?`;
    await connection.query(query, [firstName, lastName]);
    console.log(`${firstName} ${lastName} successfully removed.`);
};

//function list CLI user
async function uiPrompt() {
    console.log('\n')
    return inquirer.prompt({
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
        ]
    })
}

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

async function deleteEmployee () {
    const employees = await acquireEmployeeRoster();
    return inquirer.prompt([
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
    return inquirer.prompt([
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
async function addNewRole () {
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

async function viewOptions () {
        const prompt = await uiPrompt();
        switch(prompt.action.toLowerCase()) {

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
                await obtainAllDepartments();
                break;}

            case "view all roles": {
                await obtainAllRoles();
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

            case "exit": {
                terminateCircuito = true;
                console.log("Thanks for using Staff-Tracker!")
                process.exit(0);
            }
            default:
                break;
        }
    }
