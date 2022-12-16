const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : true
  },
  time : {
    type : Date,
    default : Date.now
  },
  posts : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Posts"
  }
})

module.exports = mongoose.model("Comments", commentsSchema);