const mysql = require("./mySql/mysqlPool");

const DB = process.env.DB_NAME;

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

let selectUsers = () => {
  return mysql.execute(`SELECT * FROM ${DB}.users;`);
};

let getUser = (user) => {
  return mysql.execute(`SELECT * FROM ${DB}.users WHERE email = ?;`)
  ,[user];
};

let newUser = (username, password, name, dark_mode) => {
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
// let updateUser = ({ password, full_name}) => {
//   return mysql.execute(
//     `UPDATE project_database.users
//         SET email = ?, password = ?, full_name = ? WHERE email = ?;`,
//     [email, password, full_name, oldUsername]
//   );
// };
let updateUser = (password, full_name, email) => {
  return mysql.execute(
    `UPDATE ${DB}.users
        SET password = ?, full_name = ? WHERE email = ?;`,
    [password, full_name, email]
  );
};

module.exports.newOrder = newOrder;
module.exports.calcOrder = calcOrder;
module.exports.totalOrder = totalOrder;
module.exports.getData = getData;
module.exports.cancelOrder = cancelOrder;
module.exports.selectUsers = selectUsers;
module.exports.getUser = getUser;
module.exports.newUser = newUser;
module.exports.last_access_date = last_access_date;
module.exports.updateUser = updateUser;
