module.exports = (req, res, next) => {
  const { is_admin } = req.session.user || 0;
  const { totalItems } = req.session.cart || 0;
  req.nav = {
    cpage: req.originalUrl,
    loginname: req.session.name,
    isAdmin: is_admin,
    totalItems,
  };
  next();
};
