const mysql = require('mysql2c');
const util = require('util');

const connection = createConnection({
    host: "localhost", 
    port: 8000,
    user: "root", 
    password: "root",
    database: "management_db",
});


//connect to server


connection.connect((err) => {
    if (err) throw err;});

connection.query = util.promisify(connection.query).bind(connection);


module.exports = connection;

