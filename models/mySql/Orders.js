const mysql = require("./mysqlpool");

const DB = process.env.DB_NAME;

let getAllOrders = () => {
  return mysql.execute(`SELECT * FROM ${DB}.orders`);
};
let getOrdersByUserID = (userID) => {
  return mysql.execute(`SELECT * FROM ${DB}.orders WHERE user_id = ?`, [
    userID,
  ]);
};

let getOrdersBySatus = (satus) => {
  return mysql.execute(`SELECT * FROM ${DB}.orders WHERE status = ?`, [satus]);
};

let createOrder = (user_id, price) => {
  return mysql.execute(
    `INSERT INTO ${DB}.orders(user_id, order_date, price, status) VALUES(?,now(),?,'successful')`,
    [user_id, price]
  );
};
let insertIntoOrderItem = (order_id, item_id, amount) => {
  return mysql.execute(
    `INSERT INTO ${DB}.order_items(order_id,item_id,amount) VALUES(?,?,?)`,
    [order_id, item_id, amount]
  );
};

module.exports.getAllOrders = getAllOrders;
module.exports.getOrdersByUserID = getOrdersByUserID;
module.exports.getOrdersBySatus = getOrdersBySatus;
module.exports.createOrder = createOrder;
module.exports.insertIntoOrderItem = insertIntoOrderItem;
