const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true,
  },
  total : {
    type : Number,
    required : true,
  },
  spent : {
    type : Number,
    required : true
  },
  items : {
    type : Array,
    items : {
      type : Object,
      properties : {
        name : { type : String},
        cost : {type : Number},
        category : {type : String}
      }
    }
  }
});

UserSchema.methods.comparePassword =async function(password) { 
  console.log("hit-password");
  const match = await bcryptjs.compare(password,this.password);
  console.log(match);
  return match;
}
const User = mongoose.model("User", UserSchema);

module.exports = User;