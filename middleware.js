module.exports.isloggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){
req.flash("err", "you must have logged in to secure create list");
       return res.redirect("/login");

    }
    next();
}