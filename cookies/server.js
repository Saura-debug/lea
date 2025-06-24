const express = require("express");
const app = express();
const flash = require("connect-flash");
const path = require("path");
const session = require("express-session");


app.use(flash());
 app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));


const sessionoption ={
    secret : "youaregeneius",
    resave : false,
    saveUninitialized:true,


};
app.use(session(sessionoption));








// const cookieparser = require("cookie-parser");

// app.use(cookieparser("secretcode"));


// // app.get("/" , (req,res)=>{
// //     res.send("wow got it ");
// // })

// // app.get("/cookie", (req,res)=>{
// //      res.cookie("name","sudhanshu pal");
// //     res.send("cookie has been send ");
// // })

// app.get("/cookie/signed", (req,res)=>{
//     res.cookie("prime","optimus",{signed:true});
//     res.send("your signed cookie has been sent");
// });

// app.get("/verified", (req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

const session = require("express-session");
app.use(session({secret:"sudhanshu pal",
    resave : false,saveUninitialized : true,
}));

app.get("/check", (req,res)=>{
 let {name = "anonymous"} = req.query;

 if(name === "anonymous"){
     req.flash("error","oops, user has'nt registered yet");

 } else{
     req.flash("successful","user has been a good man");

 }



   req.session.name = name;
   res.redirect("/again/check")
   
})

app.get("/again/check", (req,res)=>{
    res.locals.message =  req.flash("successful");
    res.locals.error = req.flash("error");
   res.render("flash.ejs",{name : req.session.name});
})
// app.get("/", (req,res)=>{
//     res.send("you first session has intialized");
// })

// app.get("/count", (req,res)=>{
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count =1;
//     }
//     res.send(`the number of times you have visited the site ${req.session.count}`)
// })

app.listen(3000, ()=>{
    console.log("3000 server has been connected");
})