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
  initdata.data =  initdata.data.map((obj)=>( {...obj, owner :"68620eeed8bb70582dd1ae86"})),
    await Listing.insertMany(initdata.data);
    console.log("data has been intialized");

};
initDB();
