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

// const test = async () => {
//   try {
//     let hash = await generatePassword("afoiwejoifj");
//     // let hash = await checkPassword(
//     //   "afoiwejoifj",
//     //   "$2a$10$DWXpZmw5fGB0T2RE1bkn1.EmwAyR01H6g12fuNKruvXe8cR1Tdrpa"
//     // );
//     console.log(hash);
//   } catch (e) {
//     console.log(e);
//   }
// };

// test();