const mysql = require("mysql2/promise");

const db = mysql.createPool({
host:"localhost",
user:"root",
password:"222426",
database:"fresh_market"
});

module.exports = db;