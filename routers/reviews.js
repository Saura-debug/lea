const express = require("express");
const router = express.Router({mergeParams :true});
const review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../servervalidatiom.js");
const Listing = require("../models/listings.js");


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
router.delete("/:reviewid",wrapAsync(async(req,res)=>{
        let {id, reviewid} = req.params;
        await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewid}});
        await review.findByIdAndDelete(reviewid);

        res.redirect(`/listings/${id}`);

    }))

router.post("/" , reviewvalidate , wrapAsync(async (req,res)=>{
    let listing =  await Listing.findById(req.params.id);
    let newreview = new review(req.body.review);
     listing.reviews.push(newreview);
       await listing.save();
    await newreview.save();
   
    res.redirect(`/listings/${listing._id}`);

   


}))

module.exports = router;