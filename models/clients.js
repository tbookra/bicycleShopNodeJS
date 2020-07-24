const mysql = require("./mysqlpool");


let newOrder = (loginname, itemID, amount, color) => {
  return mysql.execute(

    "INSERT INTO bicycle_shop.orders(user_name, item_id, amount_ordered, color) VALUES (?,?,?,?);",
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
              ;` ,
             [loginname]
        );
    };

let getData = (category) => {
    return mysql.execute(
         `SELECT * FROM bicycle_shop.products
         where category = ${category};`,
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
          return mysql.execute(
'SELECT * FROM bicycle_shop.users;'
           );
        };

let newUser = (username, password, name) => {
    return mysql.execute(
    
        "INSERT INTO bicycle_shop.users(username, password, name) VALUES (?,?,?);",
        [username, password, name]
    );    
    };
let updateUser = (newUsername, password, name,oldUsername) => {
    return mysql.execute(
    
        `UPDATE bicycle_shop.users
        SET username = ?, password = ?, name = ? WHERE username = ?;`,
        [newUsername, password, name,oldUsername]
    );    
    };



module.exports.newOrder = newOrder;
module.exports.calcOrder = calcOrder;
module.exports.totalOrder = totalOrder;
module.exports.getData = getData;
module.exports.cancelOrder = cancelOrder;
module.exports.selectUsers = selectUsers;
module.exports.newUser = newUser;
module.exports.updateUser = updateUser;