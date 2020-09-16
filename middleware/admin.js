module.exports = (req, res, next) => {
    const { is_admin } = req.session.user || 0;
    if (is_admin) {
        next();
    } else {
        res.redirect("/");
    }
};
