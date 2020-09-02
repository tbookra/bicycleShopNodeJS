const logout = (req, res) => {
  req.session.name = undefined;
  req.session.user = undefined;
  req.session.auth_token = undefined;
  req.session.lastLocation = undefined;
  req.session.justRegistered = undefined;
  res.redirect("/");
};

module.exports.logout = logout;
