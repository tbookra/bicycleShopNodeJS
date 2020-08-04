// const jwt = require("../auth/jwt");

// module.exports = async (req, res, next) => {
//   console.log(req.body.token);
 
//   try {
//     req.jwtTokenData = await jwt.verifyToken(req.body.token);
//     // req.jwtTokenData = await jwt.verifyToken(req.headers.token);
//     next();
//   } catch (e) {
//     console.log(e);
//     res.redirect("/404");
//   }
// };