const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listings.js");






async function main() {
   await mongoose.connect(server);
}




let server = 'mongodb://127.0.0.1:27017/NEWWORLD';
main().then(()=>{
    console.log("mongodb has been connected");

}) .catch((err)=>{
    console.log(err);
});
const initDB = async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data has been intialized");

};
initDB();
