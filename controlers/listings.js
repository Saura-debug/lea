const Listing = require("../models/listings.js")
module.exports.alllisting = async(req,res)=>{
    let alllisting = await Listing.find({});
  
    res.render("listing/index.ejs",{alllisting});

 
}

module.exports.formaddnewlisting = (req,res)=>{
    
   
    res.render("listing/new.ejs");
 }

 module.exports.homelisting = (req,res) =>{
     res.redirect("/listings");
  }

  module.exports.detaillisting = async (req,res,next)=>{
    let  { id } = req.params;
  
    const listing = await Listing.findById(id).populate({path :"reviews", populate : "author"}).populate("owner");
    console.log(listing);
if(!listing){
    req.flash("err", "the listing you have requested does not exist");
    res.redirect("/listings");
    
}
 else {

    res.render("listing/show.ejs", {listing});
    

}
   
    
 }

 module.exports.editlisting = async (req,res)=>{
    let {id} = req.params;
   
         await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","edited successfully")
    res.redirect("/listings");

  
   
}

module.exports.addedlisting = async(req,res,next)=>{
    
         let newlisting = new Listing(req.body.listing);
          let result = listingSchema.validate(req.body);
          console.log(result);
          newlisting.owner = req.user._id;
              await newlisting.save();
    req.flash("success", "new listing has been added");
    res.redirect("/listings");

    
    
   
}

module.exports.deletelisting = async (req,res)=>{
    let {id} = req.params;
   const aaa  = await Listing.findByIdAndDelete(id);
   req.flash("success","your one home has been deleted");
 
    res.redirect("/listings");
}

module.exports.formeditlisting = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    
    res.render("listing/edit.ejs",{listing});


}