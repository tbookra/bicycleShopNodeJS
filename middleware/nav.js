module.exports = (req, res, next) => {
  req.nav = {
    cpage: req.originalUrl,
    loginname: req.session.name,
  };
  next();
};
