const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name:{type:String,required:true, minlength:2},
  last_name:{type:String,required:true, minlength:2},
  username:{type:String,required:true, minlength:2},
  password:{type:String,required:true, minlength:2},
  profilePicUrl:{type:String},
  date_create:{type:Date, required:true,default:Date.now()},
})

module.exports = mongoose.model('User', UserSchema);