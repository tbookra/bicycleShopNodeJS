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
    `INSERT INTO ${DB}.users(email, password, full_name,is_in_ban, dark_mode,is_admin,register_date,last_access_date,last_password_modification) VALUES (?,?,?,0,?,0,now(),now(),now());`,
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
        SET password = ?, full_name = ?, last_password_modification = now() WHERE email = ?;`,
    [password, full_name, email]
  );
};

let deleteUser = (id) => {
  return mysql.execute(`DELETE FROM ${DB}.users WHERE user_id =?`, [id]);
};

let getUserInfo = async (id) => {
  return await mysql.execute(
    `SELECT u.user_id, u.full_name, pi.country, pi.city, pi.address, pi.phone_number FROM ${DB}.users u
      JOIN ${DB}.payment_info pi ON u.user_id = pi.user_id WhERE u.user_id = ?`,
    [id]
  );
};

let insertUserInfo = async ({
  user_id,
  country,
  city,
  address,
  phone_number,
}) => {
  return await mysql.execute(
    `INSERT INTO ${DB}.payment_info values(?,?,?,?,?);`,
    [user_id, country, city, address, phone_number]
  );
};

let deleteUserInfo = (id) => {
  return mysql.execute(`DELETE FROM ${DB}.payment_info WHERE user_id =?`, [id]);
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUserByID = getUserByID;
module.exports.getUserByEmail = getUserByEmail;
module.exports.createUser = createUser;
module.exports.last_access_date = last_access_date;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserInfo = getUserInfo;
module.exports.insertUserInfo = insertUserInfo;
module.exports.deleteUserInfo = deleteUserInfo;
