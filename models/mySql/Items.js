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
  return mysql.execute(`INSERT INTO ${DB}.items VALUES (null,?,?,?,?,?)`, [
    itemDetail.createItem_item_name,
    itemDetail.createItem_category,
    itemDetail.createItem_quntity,
    itemDetail.createItem_unit_price,
    itemDetail.createItem_img_url,
  ]);
};

let updateItem = (itemDetail) => {
  return mysql.execute(
    `UPDATE ${DB}.items SET item_name = ?, quntity_in_stock = ?, unit_price = ?, img_url = ? WHERE item_id = ? `,
    [
      itemDetail.updateItem_item_name,
      itemDetail.updateItem_quntity,
      itemDetail.updateItem_unit_price,
      itemDetail.updateItem_img_url,
      itemDetail.updateItem_item_id,
    ]
  );
};

let deleteItem = (itemID) => {
  return mysql.execute(`DELETE FROM ${DB}.items WHERE item_id = ?`, [itemID]);
};

module.exports.getAllItems = getAllItems;
module.exports.getItemsByCategory = getItemsByCategory;
module.exports.getItemsBySearch = getItemsBySearch;
module.exports.getItemsByitemAndCategoty = getItemsByitemAndCategoty;
module.exports.getItemByID = getItemByID;
module.exports.getItemByName = getItemByName;
module.exports.createItem = createItem;
module.exports.updateItem = updateItem;
module.exports.deleteItem = deleteItem;
