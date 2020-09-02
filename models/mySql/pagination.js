const mysql = require("./mysqlpool");

const DB = process.env.DB_NAME;


let pageItems = (category,sort,limit, offset) => {
    return mysql.execute(`SELECT * FROM ${DB}.items
    where category = '${category}'
    order by unit_price ${sort}
    LIMIT ${limit} OFFSET ${offset}`); 
  };

  module.exports.pageItems = pageItems;