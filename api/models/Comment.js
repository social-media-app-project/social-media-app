const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const { Schema } = mongoose;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model('Comment', CommentSchema);
