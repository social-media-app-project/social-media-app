const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author :{type:Schema.Types.ObjectId, ref:'Users'},
  date:{type:Date, required:true, default:Date.now()},
  message:{type:String},
})

module.exports = mongoose.model('Post',PostSchema);