USE management_db;

INSERT INTO department (name)
VALUES ('Engineering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Software Engineer', 240000, 1),
('Software Engineer', 190000, 1);
INSERT INFO role (title, salary, department_id)
VALUES ('Accountant', 170000, 2);
INSERT INTO role (role, salary, department_id)
VALUES('Lawyer', 200000, 3),
('Lead Lawyer', 300000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 90000, 4),
('Lead Salesperson', 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Andrew', 'Ross', 1, null),
('George', 'Daniel', 3, 3),
('Joe', 'Shields', 2, null),
('Pedro', 'Jones', 4, 4),
('Kevin', 'Rondo', 2, null);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;