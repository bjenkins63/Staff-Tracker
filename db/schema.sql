DROP DATABASE IF EXISTS management_db;
CREATE database management_db;

USE management_db;


CREATE TABLE employee {
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES role(id));


CREATE TABLE role {
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    role varchar(30),
    salary DECIMAL(12,4),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
    };

CREATE TABLE department {
    id INTEGER(11) AUTO_INCREMENT NOT NULL
    name varchar(30),
    PRIMARY KEY (id)
    };

    

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
