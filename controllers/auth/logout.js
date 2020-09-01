const logout = (req, res) => {
  req.session.name = undefined;
  req.session.auth_token = undefined;
  req.session.lastLocation = undefined;
  res.redirect("/");
};

module.exports.logout = logout;
