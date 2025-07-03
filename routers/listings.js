const express = require("express");
const router = express.Router();
const {listingSchema} = require("../servervalidatiom.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const ExpressError = require("../utils/expresserror.js");
const {isloggedin} = require("../middleware.js");






const validate = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el)  => el.message).join(",");
        throw new ExpressError(400,errmsg);
    } else {
        next();
    }

} ;
 //new

 
 router.get("/new", isloggedin, (req,res)=>{
    
   
    res.render("listing/new.ejs");
 })

 router.get("/home", (req,res) =>{
    res.redirect("/listings");
 })
 router.get("/:id",wrapAsync(async (req,res,next)=>{
    let  { id } = req.params;
  
    const listing = await Listing.findById(id).populate("reviews");
if(!listing){
    req.flash("err", "the listing you have requested does not exist");
    res.redirect("/listings");
}
 else {
    res.render("listing/show.ejs", {listing});

}
   
    
 }));




router.put("/:id",validate,wrapAsync( async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req,flash("success","edited successfully")
    res.redirect("/listings");
}))


// index route
router.get("/", wrapAsync(async(req,res)=>{
    let alllisting = await Listing.find({});
  
    res.render("listing/index.ejs",{alllisting});

 
}));
router.post("/", validate,wrapAsync(async(req,res,next)=>{
    
         let newlisting = new Listing(req.body.listing);
          let result = listingSchema.validate(req.body);
          console.log(result);
    await newlisting.save();
    req.flash("success", "new listing has been added");
    res.redirect("/listings");

    
    
   
}));

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err) {
            return next(err);

        }
        req.flash("success","user has been logut");
        res.redirect("/listings")

    })
})
// delete of the listings
router.delete("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
   const aaa  = await Listing.findByIdAndDelete(id);
   req.flash("success","your one home has been deleted");
 
    res.redirect("/listings");
}));


 router.get("/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    
    res.render("listing/edit.ejs",{listing});


}));

 // delete Reivew

 module.exports = router;
  