module.exports = (req, res, next) => {
  if (req.session.name) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
