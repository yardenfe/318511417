const mysql = require("mysql2");
const dbConfig = require("./db.config"); ///////////////////

// Create a connection to the database
const connection = mysql.createConnection({
host: dbConfig.HOST,
user: dbConfig.USER,
password: dbConfig.PASSWORD,
database: dbConfig.DATABASE
});
// open the MySQL connection
connection.connect(error => {
if (error) throw error;
console.log("Successfully connected to the database.");
});
module.exports = connection;