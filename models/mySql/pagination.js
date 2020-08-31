const mysql = require("./mysqlpool");

const DB = process.env.DB_NAME;


let pageItems = (category,limit, offset) => {
    return mysql.execute(`SELECT * FROM ${DB}.items
    where category = '${category}'
    LIMIT ${limit} OFFSET ${offset}`); 
  };

  module.exports.pageItems = pageItems;