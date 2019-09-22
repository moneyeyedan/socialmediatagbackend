let connection = require('./connection');
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection(connection);
module.exports = {
    mysqlConnection
}