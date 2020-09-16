const Users = require("../../models/mySql/Users");
const Items = require("../../models/mySql/Items");

const checkIfBodyWithData = (body) => {
  return Object.keys(body).every((k) => {
    return body[k];
  });
};

const adminItemCreate = async (req, res) => {
  console.log(req.body);
  let bodyIsWithData = checkIfBodyWithData(req.body);
  if (!bodyIsWithData) {
    req.session.adminItemCreateErr = ["please fill all form inputs"];
    return res.redirect("/admin");
  }
  try {
    await Items.createItem(req.body);
    req.session.adminItemCreateErr = ["Item Created"];
  } catch (err) {
    console.log(err);
  }
  req.session.adminUserErr = [];
  res.redirect("/admin");
};
const adminItemUpdate = async (req, res) => {
  console.log(req.body);
  let bodyIsWithData = checkIfBodyWithData(req.body);
  if (!bodyIsWithData) {
    req.session.adminItemCreateErr = ["please fill all form inputs"];
    return res.redirect("/admin");
  }
  try {
    await Items.updateItem(req.body);
    req.session.adminItemCreateErr = ["Item Updated"];
  } catch (err) {
    console.log(err);
  }
  req.session.adminUserErr = [];
  res.redirect("/admin");
};
const adminItemDelete = async (req, res) => {
  console.log(req.body);
  let bodyIsWithData = checkIfBodyWithData(req.body);
  if (!bodyIsWithData) {
    req.session.adminItemCreateErr = ["please fill all form inputs"];
    return res.redirect("/admin");
  }
  try {
    await Items.deleteItem(req.body.deleteItem_item_id);
    req.session.adminItemCreateErr = ["Item Deleted"];
  } catch (err) {
    console.log(err);
  }
  req.session.adminUserErr = [];
  res.redirect("/admin");
};

module.exports.adminItemCreate = adminItemCreate;
module.exports.adminItemUpdate = adminItemUpdate;
module.exports.adminItemDelete = adminItemDelete;
