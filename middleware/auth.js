module.exports = (req, res, next) => {
  if (!req.session.name){
    res.status(401).redirect("/auth/login");
    
  }  else {
    next();
    }
    
  };
