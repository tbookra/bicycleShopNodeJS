const Users = require("../../models/mySql/Users");
const Items = require("../../models/mySql/Items");

const adminItemCreate = async (req, res) => {
  console.log(req.body);
  res.redirect("/admin");
};
const adminItemUpdate = async (req, res) => {
  console.log(req.body);
  res.redirect("/admin");
};
const adminItemDelete = async (req, res) => {
  console.log(req.body);
  res.redirect("/admin");
};

module.exports.adminItemCreate = adminItemCreate;
module.exports.adminItemUpdate = adminItemUpdate;
module.exports.adminItemDelete = adminItemDelete;
