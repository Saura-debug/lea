const express = require("express");
const router = express.Router();

const user = require("../models/user");
const passport = require("passport");

router.get("/signup" , (req,res)=>{
    res.render("./users/signup.ejs")
})

router.post("/signup",async(req,res)=>{
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
    
  
    

})
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err) {
            return next(err);

        }
        req.flash("success","user has been logut");
        res.redirect("/listings")

    })
})  

router.get("/login" , async(req,res)=>{
    res.render("./users/login.ejs");
});


router.post("/login",
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
   
}),
async (req,res)=>{

req.flash("success","welcome to the wonderlust");
    res.redirect("/listings");
    
    
}



);







module.exports = router;