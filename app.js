const express = require("express");
const Sequelize = require("sequelize");
const Departments = require('./models/department');
const Role = require('./models/role');
const Employee = require('./models/employee');

const { Op } = Sequelize;

let app = express();

Department.hasMany(Role, { 
foreignKey: "department_id"
});

Role.belongsTo(Department, {
foreignKey: "role_id"
});

Employee.belongsTo(Role, { 
foreignKey: "role_id" 
});


app.get('/api/departments', function(request, response) {
    Departments.findAll().then((departments) => {
        response.json(departments);
    });
});

app.get('/api/departments/:id', function(request, response) {
    let { id } = request.params;

    Department.findByPk(id).then((department) => {
        if (department) {
            response.json(department);
        } else {
            response.status(404).send();
        }
        });
    });

    app.get('/api/role/:id', function(request, response) {
        let { id } = request.params;
    
        Role.findByPk(id).then((role) => {
            if (role) {
                response.json(role);
            } else {
                response.status(404).send();
            }
        });
    });

        app.get('/api/employee/:id', function(request, response) {
            let { id } = request.params;
        
            Employee.findByPk(id), {
            }.then((employee) => {
                if (employee) {
                    response.json(employee);
                } else {
                    response.status(404).send();
                }
            });
        });

app.post('/api/departments', function(request, response) {
    Department.create({
        name: request.body.name
    }).then((department) => {
        response.json(department);
    }, (errors) => {
        response.json(errors);
    });
});

app.delete('/api/departments/:id', function(request, response) {
    Department.delete({
        name: request.body.name
    }).then((department) => {
        response.json(department);
    }, (errors) => {
        response.json(errors);
    });
});

    app.listen(8080);