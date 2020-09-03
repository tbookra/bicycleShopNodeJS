const mysql = require("./mysqlpool");

const DB = process.env.DB_NAME;

let getAllItems = () => {
  return mysql.execute(`SELECT * FROM ${DB}.items`);
};

let getItemByID = (id) => {
  return mysql.execute(`SELECT * FROM ${DB}.items WHERE item_id = ?`, [id]);
};

let getItemByName = (item_name) => {
  return mysql.execute(`SELECT * FROM ${DB}.items WHERE item_name = ?`, [
    item_name,
  ]);
};

let getItemsByCategory = (category) => {
  return mysql.execute(`SELECT * FROM ${DB}.items WHERE category = ?`, [
    category,
  ]);
};

let getItemsBySearch = (searchString) => {
  return mysql.execute(
    `SELECT * FROM ${DB}.items
     WHERE item_name LIKE '%${searchString}%'`
  );
};

let getItemsByitemAndCategoty = (searchString, category) => {
  return mysql.execute(
    `SELECT * FROM ${DB}.items
     WHERE item_name LIKE '%${searchString}%' and category = '${category}'`
  );
};

let createItem = (itemDetail) => {
  return mysql.execute(`INSERT INTO ${DB}.items VALUES (null,?,?,?,?)`, [
    itemDetail.item_name,
    itemDetail.quntity_in_stock,
    itemDetail.unit_price,
    itemDetail.img_url,
  ]);
};

let deleteItem = (id) => {
  return mysql.execute(`DELETE FROM ${DB}.items WHERE item_id = ?`, [id]);
};

module.exports.getAllItems = getAllItems;
module.exports.getItemsByCategory = getItemsByCategory;
module.exports.getItemsBySearch = getItemsBySearch;
module.exports.getItemsByitemAndCategoty = getItemsByitemAndCategoty;
module.exports.getItemByID = getItemByID;
module.exports.getItemByName = getItemByName;
module.exports.createItem = createItem;
module.exports.deleteItem = deleteItem;
