const Users = require("../../models/mySql/Users");
const bcrypt = require("../../auth/bcrypt");
const JWT = require("../../auth/jwt");
let Items = require('../../models/mySql/Items');
const passwordToModify = require('../../middleware/passwordToModify');
passwordWasModified = require('../../middleware/passwordWasModified');

let token_id = undefined;
 
const loginPage = async (req, res) => {
  try {
    req.session.signinErr = [];
    req.session.updateErr = [];
    let errArrey = req.session.loginErr ? req.session.loginErr : [];
    //for access users from main page
    let userList = await Users.getAllUsers();
    res.render("login", { errArrey: errArrey, ...req.nav });
    req.session.err = undefined;
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // handles with if no name was asigned
      req.session.loginErr = ["email or password missing"];
      res.redirect("/auth/login");
      return;
    }
    
    let [user1] = await Users.getUserByEmail(email);
    
    let [usersList] = await Users.getAllUsers();
    let user = usersList.filter((user) => user.email == email);

    if (user1.length == 0) {
      // if there is no such user in the database
      req.session.loginErr = ["the email not exist"];
      res.redirect("/auth/login");
    } else {
      let passAuth = await bcrypt.checkPassword(password, user[0].password);
      if (passAuth) {
        // this part is where everything is right
        req.session.name = user[0].email;
        await Users.last_access_date(user[0].email);
        let expiresIn = req.body.rememberMe ? true : false;
        token_id = await JWT.generateToken(user[0].email, expiresIn);
        req.session.auth_token = token_id;

        if(req.session.lastLocation){
          let item_obj = req.session.lastLocation
          // let place = await Items.getItemByID(item_obj.item_id);
          // place = place[0][0];
          // res.render("place_ditales", { ...req.nav, title: place.item_name, place: place });
          res.redirect(`/${item_obj.category}/${item_obj.item_id}`)
        } else {
          next();
        }
       
      
      } else {
        // if user exists but a wrong password
        req.session.loginErr = ["email or password incorrect"];

        res.redirect("/auth/login");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.loginPage = loginPage;
module.exports.login = login;
