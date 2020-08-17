const mysql = require("./mysqlPool");

const DB = process.env.DB_NAME;

let getAllUsers = () => {
  return mysql.execute(`SELECT * FROM ${DB}.users;`);
};

let getUser = (user) => {
  return mysql.execute(`SELECT * FROM ${DB}.users WHERE email = ?;`, [user]);
};

let createUser = (username, password, name, dark_mode) => {
  return mysql.execute(
    `INSERT INTO ${DB}.users(email, password, full_name, dark_mode,is_admin,register_date,last_access_date) VALUES (?,?,?,?,0,now(),now());`,
    [username, password, name, dark_mode]
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
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.last_access_date = last_access_date;
module.exports.updateUser = updateUser;
