// const db = require("../config/db");

// exports.findUserByEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

// exports.createUser = (name, email, password) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//       [name, email, password],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );
//   });
// };


const db = require("../config/db");

// FIND USER
exports.findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows;
};

// CREATE USER
exports.createUser = async (name, email, password) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result;
};