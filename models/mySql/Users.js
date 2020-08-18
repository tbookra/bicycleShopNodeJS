const mysql = require("./mysqlPool");

const DB = process.env.DB_NAME;

let getAllUsers = () => {
  return mysql.execute(`SELECT * FROM ${DB}.users;`);
};

let getUserByID = (userID) => {
  return mysql.execute(`SELECT * FROM ${DB}.users WHERE user_id = ?;`, [
    userID,
  ]);
};

let getUserByEmail = (email) => {
  return mysql.execute(`SELECT * FROM ${DB}.users WHERE email = ?;`, [email]);
};

let createUser = ({ email, hashPassword, full_name, darkMode }) => {
  return mysql.execute(
    `INSERT INTO ${DB}.users(email, password, full_name, dark_mode,is_admin,register_date,last_access_date) VALUES (?,?,?,?,0,now(),now());`,
    [email, hashPassword, full_name, darkMode]
  );
};
let last_access_date = (email) => {
  return mysql.execute(
    `UPDATE ${DB}.users
        SET last_access_date = now() WHERE email = ?;`,
    [email]
  );
};

let updateUser = (password, full_name, email) => {
  return mysql.execute(
    `UPDATE ${DB}.users
        SET password = ?, full_name = ? WHERE email = ?;`,
    [password, full_name, email]
  );
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUserByID = getUserByID;
module.exports.getUserByEmail = getUserByEmail;
module.exports.createUser = createUser;
module.exports.last_access_date = last_access_date;
module.exports.updateUser = updateUser;
