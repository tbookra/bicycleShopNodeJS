const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return new Promise((ok, not) => {
    jwt.sign({_id: data}, process.env.TOKENKEY,{ expiresIn: "1h" }, (err, token) => {
      if (err) not(err);
      else ok(token);
    });
  });
};
// { expiresIn: "1h" },
// const verifyToken = (token) => {
//   return new Promise((ok, not) => {
//     jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
//       if (err) not(err);
//       else ok(decoded);
//     });
//   });
// };

// let f1 = async () => {
//   //   let token = await generateToken({ id: "1232143" });
//   //   console.log(token);
//   //   let token = await generateToken({ id: "1232143" });
//   //   console.log(token);
//   let token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzIxNDMiLCJpYXQiOjE1OTQ2NTg3MjYsImV4cCI6MTU5NDY1ODczNn0.aYFPphWBp7i3l05CPcPvnp2hxa7u7vmweiWxcIkAv-8";
//   setTimeout(async () => {
//     try {
//       let data = await verifyToken(token);
//       console.log(data);
//     } catch (e) {
//       console.log(e);
//     }
//   }, 0);
// };

// f1();

module.exports.generateToken = generateToken;
// module.exports.verifyToken = verifyToken;