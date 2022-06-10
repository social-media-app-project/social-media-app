const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Users' },
  date: { type: Date, required: true, default: Date.now() },
  message: { type: String },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  comments: [{ message: { type: String }, author: { type: Schema.Types.ObjectId, ref: 'Users' } }],
});

module.exports = mongoose.model('Post', PostSchema);
