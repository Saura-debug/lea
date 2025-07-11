module.exports.signuppageusers =  (req,res)=>{
    res.render("./users/signup.ejs")
}

module.exports.signedupusers = async(req,res)=>{
    try {
        let {username, email, password} = req.body;
    let newuser = new user ({
        username,
        email,
       

    });
    let register =await  user.register(newuser,password);
      console.log(register);
      req.login(register,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to the wonderlust");
        res.redirect("/listings");
      })
      
      

    } 
    catch(er){
        req.flash("err",er.message);
        res.redirect("/signup");
    }
    
  
    

};
module.exports.logoutusers = (req,res,next)=>{
    req.logOut((err)=>{
        if(err) {
            return next(err);

        }
        req.flash("success","user has been logut");
        res.redirect("/listings")

    })
}
module.exports.pageloginusers = async(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.loggedinusers = async (req,res)=>{

req.flash("success","welcome to the wonderlust");
   let redirecturl = res.locals.original || "/listings";
    res.redirect(redirecturl);
    
    
}