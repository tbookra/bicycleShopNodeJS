const Users = require("../../models/mySql/Users");
const JWT = require("../../auth/jwt");

const index = async (req, res) => {
  try {
    let verfiedUser = req.session.auth_token
      ? await JWT.verifyToken(req.session.auth_token)
      : undefined;
    verfiedUser
      ? (req.session.name = verfiedUser._id)
      : (req.session.name = undefined);
    let userList = await Users.getAllUsers();
    module.exports.userList = userList[0];
    let user = userList[0].filter((user) => user.email == verfiedUser._id);
    res.render("index", {
      title: "Express",
      ...req.nav,
      userList: userList[0],
      VerfiedUser: `HELLO ${user[0].full_name}`,
    });
  } catch (e) {
    req.session.name = undefined;
    res.render("index", { title: "Express", ...req.nav, VerfiedUser: "" });
    console.log(e);
  }
};

module.exports.index = index;
