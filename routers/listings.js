const express = require("express");
const router = express.Router();
const {listingSchema} = require("../servervalidatiom.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const ExpressError = require("../utils/expresserror.js");
const {isloggedin,owner} = require("../middleware.js");
const listingcontroller = require("../controlers/listings.js");






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

 
 router.get("/new", isloggedin,wrapAsync(listingcontroller.formaddnewlisting ));

 router.get("/home",listingcontroller.homelisting );
 router.get("/:id",wrapAsync(listingcontroller.detaillisting));




router.put("/:id", owner,validate,wrapAsync( listingcontroller.editlisting));


// index route
router.get("/", wrapAsync(listingcontroller.alllisting));
router.post("/", validate,wrapAsync(listingcontroller.addedlisting));


// delete of the listings
router.delete("/:id", owner, wrapAsync(listingcontroller.deletelisting));


 router.get("/:id/edit", wrapAsync(listingcontroller.formeditlisting));

 // delete Reivew

 module.exports = router;
  