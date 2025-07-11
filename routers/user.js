const express = require("express");
const router = express.Router();

const user = require("../models/user");
const passport = require("passport");
const {original} = require("../middleware.js");
const controllersusers = require("../controlers/user.js");

router.get("/signup" , controllersusers.signuppageusers);

router.post("/signup",controllersusers.signuppageusers);
router.get("/logout",controllersusers.logoutusers);  

router.get("/login" ,controllersusers.pageloginusers);


router.post("/login", original,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
   
}), controllersusers.loggedinusers




);







module.exports = router;