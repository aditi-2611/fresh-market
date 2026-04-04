

// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "222426", // 👉 put your MySQL password
//   database: "fresh_market", // 👉 your DB name
// });

// db.connect((err) => {
//   if (err) {
//     console.log("DB Connection Failed:", err);
//   } else {
//     console.log("Connected to MySQL Database");
//   }
// });

// module.exports = db;


const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "222426",
  database: "fresh_market",
});

module.exports = db;