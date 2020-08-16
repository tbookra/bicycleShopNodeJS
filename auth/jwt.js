const jwt = require("jsonwebtoken");

const generateToken = (data, rememberMe) => {
  let expires_in = rememberMe ? "30d" : "1h";
  return new Promise((ok, not) => {
    jwt.sign({_id: data}, process.env.TOKENKEY,{ expiresIn: expires_in }, (err, token) => {
      if (err) not(err);
      else ok(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((ok, not) => {
    jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
      if (err) not(err);
      else ok(decoded);
    });
  });
};



module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;