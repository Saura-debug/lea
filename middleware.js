const Listing = require("./models/listings.js");

const review = require("./models/review");
module.exports.isloggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.original = req.originalUrl;
req.flash("err", "you must have logged in to secure create list");
       return res.redirect("/login");

    }
    next();
}

module.exports.original = (req,res,next)=>{
    if(req.session.original){
          res.locals.original = req.session.original;

    }
    next();
  

}

module.exports.owner = async (req,res,next) =>{
     let {id} = req.params;

     let listing = await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currentuser._id)){
            req.flash("err","you are not owner of this ");
            return res.redirect(`/listings/${id}`);
        }
        next();

}

module.exports.validate  = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el)  => el.message).join(",");
        throw new ExpressError(400,errmsg);
    } else {
        next();
    }

} ;

module.exports.reviewauthen = async (req,res,next) =>{
     let {reviewid,id} = req.params;

     let revie = await review.findById(reviewid);
        if(!revie.author.equals(res.locals.currentuser._id)){
            req.flash("err","you are not owner of this ");
            return res.redirect(`/listings/${id}`);
        }
        next();

}