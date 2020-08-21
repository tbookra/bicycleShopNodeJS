const mysql = require("./mysqlpool");

const DB = process.env.DB_NAME;

let getAllItems = async () => {
  return await mysql.execute(`SELECT * FROM ${DB}.items`);
};

let getItemByID = async (id) => {
  return await mysql.execute(`SELECT * FROM ${DB}.items WHERE item_id = ?`, [
    id,
  ]);
};

let getItemByName = async (item_name) => {
  return await mysql.execute(`SELECT * FROM ${DB}.items WHERE item_name = ?`, [
    item_name,
  ]);
};

let getItemsByCategory = async (category) => {
  return await mysql.execute(`SELECT * FROM ${DB}.items WHERE category = ?`, [
    category,
  ]);
};

let getItemsBySearch = async (searchString) => {
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

let deleteItem = async (id) => {
  return await mysql.execute(`DELETE FROM ${DB}.items WHERE item_id = ?`, [id]);
};

module.exports.getAllItems = getAllItems;
module.exports.getItemsByCategory = getItemsByCategory;
module.exports.getItemsBySearch = getItemsBySearch;
module.exports.getItemByID = getItemByID;
module.exports.getItemByName = getItemByName;
module.exports.createItem = createItem;
module.exports.deleteItem = deleteItem;
