module.exports = (req, res, next) => {
    if (!req.session.changePassword){
       next();
    }  else {
        res.redirect("/auth/update");
      }
      
    };
  