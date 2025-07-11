const Listing = require("../models/listings");
const review = require("../models/review")
module.exports.deletereview = async(req,res)=>{
        let {id, reviewid} = req.params;
        await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewid}});
        await review.findByIdAndDelete(reviewid);

        res.redirect(`/listings/${id}`);

    }

    module.exports.addedreview = async (req,res)=>{
    let listing =  await Listing.findById(req.params.id);
    let newreview = new review(req.body.review);
    newreview.author = req.user._id;
    console.log(newreview.author);
     listing.reviews.push(newreview);
       await listing.save();
    await newreview.save();
   

    res.redirect(`/listings/${listing._id}`);

   


}