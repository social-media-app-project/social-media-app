const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const { Schema } = mongoose;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true, default: new Date() },
  message: { type: String, required: true },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
