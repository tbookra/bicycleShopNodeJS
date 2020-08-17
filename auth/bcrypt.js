const bcrypt = require("bcryptjs");

const generatePassword = (password) => {
  return new Promise((ok, not) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) not(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) not(err);
        else ok(hash);
      });
    });
  });
};


const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports.generatePassword = generatePassword;
module.exports.checkPassword = checkPassword;
