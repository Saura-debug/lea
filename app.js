const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listings.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));




let server = 'mongodb://127.0.0.1:27017/NEWWORLD';
main().then(()=>{
    console.log("mongodb has been connected");

}) .catch((err)=>{
    console.log(err);
});

app.get("/", (req,res)=>{
    res.send("your root word has been accesed");
});
 //new
 app.get("/listings/new", (req,res)=>{
    res.render("listing/new.ejs");
 })
// index route
app.get("/listings/", async(req,res)=>{
    let alllisting = await Listing.find({});
    console.log(alllisting);
    res.render("listing/index.ejs",{alllisting});

 
});
app.post("/listings/",async(req,res)=>{
    let newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
})

 app.get("/listings/:id",async (req,res)=>{
    let  { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs", {listing});
 });
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



async function main() {
   await mongoose.connect(server);
}


app.listen(8080, ()=>{
console.log("your server has been started")
})
