const express = require("express");
const router = express.Router({mergeParams :true});
const review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema,} = require("../servervalidatiom.js");
const Listing = require("../models/listings.js");
const {isloggedin,reviewauthen} = require("../middleware.js"); 
const reviewcontroller = require("../controlers/review.js");


 const reviewvalidate = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errm = error.details.map((el)=> el.message).join(",");
        console.log(errm);
        throw new ExpressError(400,errm);
    } else {
        next();
    }
};
router.delete("/:reviewid", reviewauthen,wrapAsync(reviewcontroller.deletereview))

router.post("/" , isloggedin, reviewvalidate , wrapAsync(reviewcontroller.addedreview))

module.exports = router;