const mysql = require("./mysqlpool");
const dotenv = require("dotenv");

dotenv.config();
const DB = process.env.DB_NAME;

let getAllUsers = () => {
  return mysql.execute(`SELECT * FROM ${DB}.users`);
};

let getUser = (id) => {
  return mysql.execute(`SELECT * FROM ${DB}.users WHERE user_id = ${id}`);
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
