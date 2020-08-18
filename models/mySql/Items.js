const mysql = require("./mysqlpool");

const DB = process.env.DB_NAME;

let getAllItems = async () => {
  return await mysql.execute(`SELECT * FROM ${DB}.items`);
};

let getItem = async (id) => {
  return await mysql.execute(`SELECT * FROM ${DB}.items WHERE item_id = ?`, [
    id,
  ]);
};

let getItemByName = async (searchString) => {
  return await mysql.execute(
    `SELECT * FROM ${DB}.items WHERE item_name LIKE '?%'`,
    [searchString]
  );
};

let createItem = async (itemDetail) => {
  return await mysql.execute(`INSERT INTO ${DB}.items VALUES (null,?,?,?,?)`, [
    itemDetail.item_name,
    itemDetail.quntity_in_stock,
    itemDetail.unit_price,
    itemDetail.img_url,
  ]);
};

module.exports.getAllItems = getAllItems;
module.exports.getItem = getItem;
module.exports.createItem = createItem;
module.exports.getItemByName = getItemByName;
