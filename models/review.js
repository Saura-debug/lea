const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

const newreviews = new Schema({
    comment : String, 
    rating : {
        type : Number,
        max : 5,
        min : 1,

    },
    createdAt : {
        type : Date,
        default :  Date.now(),

    }, 

    author : {
        type : Schema.Types.ObjectId,
        ref : "user"
    }
})


const review = mongoose.model("review",newreviews);
module.exports = review;
