const authMiddleware = (req, res, next) => {
  if (req.session.name) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = authMiddleware;
