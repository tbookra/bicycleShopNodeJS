const Users = require("../../models/mySql/Users");
const bcrypt = require("../../auth/bcrypt");
const JWT = require("../../auth/jwt");

let token_id = undefined;

const loginPage = async (req, res) => {
  try {
    req.session.signinErr = [];
    req.session.updateErr = [];
    let errArrey = req.session.loginErr ? req.session.loginErr : [];
    //for access users from main page
    res.status(200).render("login", { errArrey: errArrey, ...req.nav });
    req.session.err = undefined;
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // handles with if no name was asigned
      req.session.loginErr = ["email or password missing"];
      res.status(401).redirect("/auth/login");
      return;
    }

    let [user1] = await Users.getUserByEmail(email);

    let [usersList] = await Users.getAllUsers();
    let user = usersList.filter((user) => user.email == email);

    if (user1.length == 0) {
      // if there is no such user in the database
      req.session.loginErr = ["the email not exist"];
      res.status(401).redirect("/auth/login");
    } else {
      let passAuth = await bcrypt.checkPassword(password, user[0].password);
      if (passAuth) {
        // this part is where everything is right
        req.session.name = user[0].email;
        req.session.user = user[0];
        await Users.last_access_date(user[0].email);
        let expiresIn = req.body.rememberMe ? true : false;
        token_id = await JWT.generateToken(user[0].email, expiresIn);
        req.session.auth_token = token_id;
        let item_obj = req.session.lastLocation;
        if (req.session.lastLocation) {
          res.status(200).redirect(`/${item_obj.category}/${item_obj.item_id}`);
        } else {
          next();
        }
      } else {
        // if user exists but a wrong password
        req.session.loginErr = ["email or password incorrect"];

        res.status(401).redirect("/auth/login");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.loginPage = loginPage;
module.exports.login = login;
