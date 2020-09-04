const Users = require("../../models/mySql/Users");
const JWT = require("../../auth/jwt");

const index = async (req, res) => {
  try {
    let user;
    let userList = await Users.getAllUsers();
    userList = userList[0];
    console.log('regis', req.session.justRegistered);
    if(req.session.justRegistered){
      user = req.session.name;
     } else {
      let verfiedUser = req.session.auth_token
      ? await JWT.verifyToken(req.session.auth_token)
      : undefined;
    verfiedUser
      ? (req.session.name = verfiedUser._id)
      : (req.session.name = undefined);
    console.log("verifyUser", verfiedUser);
   
    user = userList.filter((user) => user.email == verfiedUser._id);
    user = user[0];
    }
    

    res.status(200).render("index", {
      title: "Express",
      ...req.nav,
      userList: userList,
      VerfiedUser: `HELLO ${user.full_name}`,
    });

  } catch (e) {
    req.session.name = undefined;
    res.status(200).render("index", { title: "Express", ...req.nav, VerfiedUser: "" });
    console.log(e);
  }
};

module.exports.index = index;
