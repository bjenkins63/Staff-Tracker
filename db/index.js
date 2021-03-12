const { query } = require("express");
const mysql = require ("mysql2");


//async database constructor
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
//constructor creates a new mysql connection with this config
    query(sql, args) {
        return new Promise ((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    console.log(error.sql)
                    Reflect(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    close () {
        return new Promise((resolve, reject) => {
            this.connection.end(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve();
                }
            })
        })
    }
};

module.exports = Database;
