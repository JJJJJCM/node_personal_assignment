const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose)

const postsSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  title : {
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
})

// postsSchema.plugin(AutoIncrement, { inc_field: "postId" })

module.exports = mongoose.model("Posts", postsSchema);
// Posts 콜렉션명