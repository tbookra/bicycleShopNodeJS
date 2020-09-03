const Users = require("../../models/mySql/Users");
const Items = require("../../models/mySql/Items");

const adminPage = async (req, res) => {
  try {
    let adminItemErr = req.session.adminItemErr || [];
    let adminUserErr = req.session.adminUserErr || [];
    res.render("admin", { adminUserErr, adminItemErr, ...req.nav });
    req.session.err = undefined;
  } catch (e) {
    console.log(e);
  }
};

const userPremissions = async (req, res) => {
  console.log(req.body);
  const { userEmailForAdmin } = req.body;
  const promoteToAdmin = req.body.promoteToAdmin ? "on" : "off";
  const giveUserban = req.body.giveUserBan ? "on" : "off";
  if (!userEmailForAdmin) return res.redirect("/admin");
  try {
    const [user] = await Users.getUserByEmail(userEmailForAdmin);
    console.log(user[0]);
    if (promoteToAdmin == "off" && giveUserban == "off") {
      console.log("none");
      req.session.adminUserErr = ["please choose an option"];
      return res.redirect("/admin");
    } else if (promoteToAdmin == "on" && giveUserban == "on") {
      req.session.adminUserErr = ["you cant choose both options"];
      console.log("both");
    } else if (promoteToAdmin == "on")
      await Users.promoteToAdmin(userEmailForAdmin);
    else if (giveUserban == "on") await Users.giveUserBan(userEmailForAdmin);
    req.session.adminUserErr = [];
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

module.exports.adminPage = adminPage;
module.exports.userPremissions = userPremissions;
