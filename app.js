const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./routers/listings.js");
const review = require("./routers/reviews.js");
const users = require("./routers/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");


 const engine = require('ejs-mate');
 app.engine('ejs', engine);
 app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,"/public"))); 
app.use(session(
    {
        secret : "sudhanshu pal",
        resave : false,
        saveUninitialized : true,
        cookie : {
             expires : Date.now() + 7 *60*60*1000,
             maxAge : 7 *60*60*1000,
             httpOnly : true, 
        }
    }
));


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.err = req.flash("err");
    res.locals.currentuser = req.user;
    next();
});

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// app.get("/demouser", async(req,res)=>{
//     let newuser = new user({
//         email : "sp7017287gmail.com",
//         username : "sudhanshu",
//     })

//     let registered =  await user.register(newuser,"helloworld");
//     console.log(registered);
//     res.send(registered);

// })


app.use("/",users);
app.use("/listings",listing);
app.use("/listings/:id/reviews",review);



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

//edit

app.all(/.*/, (req, res, next) => {
           next(new ExpressError(402, "Page Not Found"));
      });




app.use((err,req,res,next)=>{
    let {statusCode = 404,message="good to see you"} = err;
    res.render("./listing/error.ejs",{message,statusCode});
})










