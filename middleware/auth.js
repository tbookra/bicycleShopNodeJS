module.exports = (req, res, next) => {
  if (!req.session.name){
    res.redirect("/auth/login");
    
  }  else {
    next();
    }
    
  };
