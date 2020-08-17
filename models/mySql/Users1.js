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

/*
let newOrder = (loginname, itemID, amount, color) => {
  return mysql.execute(
    "INSERT INTO project_database.orders(user_id, item_id, amount_ordered, color) VALUES (?,?,?,?);",
    [loginname, itemID, amount, color]
  );
};

let calcOrder = (loginname) => {
  return mysql.execute(
    `SELECT
    orders.item_id,orders.order_id,orders.color , orders.amount_ordered,products.product_name, products.price, orders.user_name
    , (select orders.amount_ordered *  products.price) as sumValue
    FROM bicycle_shop.orders
    left join products on orders.item_id = products.product_id
    where orders.paid_status = "not paid" and orders.user_name like ?;`,
    [loginname]
  );
};

let totalOrder = (loginname) => {
  return mysql.execute(
    `SELECT SUM(sumValue) as totalCharge from (SELECT
            orders.amount_ordered, products.price, orders.user_name
             , (select orders.amount_ordered *  products.price) as sumValue
             FROM bicycle_shop.orders
             left join products on orders.item_id = products.product_id
             where orders.paid_status = "not paid" and orders.user_name = ?) as ttt
              ;`,
    [loginname]
  );
};

let getData = (category) => {
  return mysql.execute(
    `SELECT * FROM bicycle_shop.products
         where category = ${category};`
  );
};

let cancelOrder = (orderNumber) => {
  return mysql.execute(
    `update bicycle_shop.orders
            set paid_status = 'canceled'
            where order_id = ${orderNumber}
            ;`
  );
};

module.exports.newOrder = newOrder;
module.exports.calcOrder = calcOrder;
module.exports.totalOrder = totalOrder;
module.exports.getData = getData;
module.exports.cancelOrder = cancelOrder;

*/
