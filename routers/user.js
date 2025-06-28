const express = require("express");
const router = express.Router({mergeParams :true});

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
    let register =await  user.register(newuser,"password");
      console.log(register);
      res.redirect("/login");

    } 
    catch(er){
        req.flash("err",er.message);
        res.redirect("/signup");
    }
    
  
    

})

router.get("/login" , async(req,res)=>{
    res.render("./users/login.ejs");
});
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

router.post("/login",
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
     successRedirect: "/listings?_= + Date.now()",  // Add this
    successFlash: "WELCOME TO NEW WORLD"  // Add this
}),



);







module.exports = router;