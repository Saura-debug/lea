const mongoose = require("mongoose");
const  Schema = mongoose.Schema;
const review = require("./review.js");
// const { ref } = require("joi");

const listingschema = new Schema({
    title : {
        type : String,
        required : true,

    },
   description: {
        type : String,
       
    },
    image : {
        type : String,
        default :"https://images.unsplash.com/photo-1748228876112-c5f37b99f77e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
       set : (v)=> v===""?"https://images.unsplash.com/photo-1748228876112-c5f37b99f77e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8": v,

    },
    price : Number,

    location : String,
    country: String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "review",
        }
    ]
});
listingschema.post("findOneAndDelete",async(listing)=>{
    await review.deleteMany({_id : {$in : listing.reviews}});
})

const Listing = mongoose.model("listing", listingschema);
module.exports = Listing;

