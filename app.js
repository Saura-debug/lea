const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listings.js");
const wrapAsync = require("./utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("./servervalidatiom.js");
const review = require("./models/review.js");

const ExpressError = require("./utils/expresserror.js");
 const engine = require('ejs-mate');
 app.engine('ejs', engine);
 app.set('view engine', 'ejs');
 

 
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,"/public"))); 
const validate = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el)  => el.message).join(",");
        throw new ExpressError(400,errmsg);
    } else {
        next();
    }

} ;
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


let server = 'mongodb://127.0.0.1:27017/NEWWORLD';
main().then(()=>{
    console.log("mongodb has been connected");

}) .catch((err)=>{
    console.log(err);
});
async function main() {
   await mongoose.connect(server);
}
app.listen(8080, ()=>{
console.log("your server has been started")
})
app.put("/listings/:id",validate,wrapAsync( async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
}))

app.get("/", (req,res)=>{
    res.redirect("/listings")
});
 //new
 app.get("/listings/new", (req,res)=>{
    res.render("listing/new.ejs");
 })
// index route
app.get("/listings/", wrapAsync(async(req,res)=>{
    let alllisting = await Listing.find({});
  
    res.render("listing/index.ejs",{alllisting});

 
}));
app.post("/listings/", validate,wrapAsync(async(req,res,next)=>{
    
         let newlisting = new Listing(req.body.listing);
          let result = listingSchema.validate(req.body);
        //   console.log(result);
    await newlisting.save();
    res.redirect("/listings");

    
    
   
}));
// delete of the listings
app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
   const aaa  = await Listing.findByIdAndDelete(id);
 
    res.redirect("/listings");
}))

 app.get("/listings/:id",wrapAsync(async (req,res,next)=>{
    let  { id } = req.params;
  
    const listing = await Listing.findById(id).populate("reviews");
       if(!listing){
    next(new ExpressError(404,"page"));
  }
    res.render("listing/show.ejs", {listing});
 }));
// app.get("/testlisting", async(req,res)=>{
//     let samplelisting = new Listing ({
//         title : "New villa",
//         description : "Indias longest villa", 
//         price : 1200, 
//         location : " near goa ",
//         country :"India"
//     })

//    await samplelisting.save();
//    console.log("you data has been saved");
//    res.send("succesfully saved");
// });

//edit
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});


}));
app.post("/listings/:id/reviews/" , reviewvalidate , wrapAsync(async (req,res)=>{
    let listing =  await Listing.findById(req.params.id);
    let newreview = new review(req.body.review);
     listing.reviews.push(newreview);
       await listing.save();
    await newreview.save();
   
    res.redirect(`/listings/${listing._id}`);

    // delete Reivew
    app.delete("/listings/:id/reviews/:reviewsid",wrapAsync(async(req,res)=>{
        let {id, reviewid} = req.params;
        await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewid}});
        await review.findByIdAndDelete(reviewid);

        res.redirect(`/listings/${id}`);

    }))



}))
app.all(/.*/, (req, res, next) => {
           next(new ExpressError(402, "Page Not Found"));
      });




app.use((err,req,res,next)=>{
    let {statusCode = 404,message="good to see you"} = err;
    res.render("./listing/error.ejs",{message,statusCode});
})










