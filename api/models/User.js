const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

const UserSchema = new Schema({
  first_name:{type:String,required:true, minlength:2},
  last_name:{type:String,required:true, minlength:2},
  username:{type:String,required:true, minlength:2},
  password:{type:String,required:true, minlength:2},
  profilePicUrl:{type:String},
  date_created:{type:Date, required:true,default:Date.now()},
})

UserSchema.virtual('full_name')
  .get(function(){
    return this.first_name+ " "+this.last_name;
  })

UserSchema.virtual('formatted_date_created')
  .get(function(){
    return DateTime.fromJSDate(this.date_created).toLocaleString(DateTime.DATE_MED)

  })


module.exports = mongoose.model('User', UserSchema);