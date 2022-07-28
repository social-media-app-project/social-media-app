const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const { Schema } = mongoose;
const { DateTime } = require('luxon');

const UserSchema = new Schema({
  first_name: { type: String, required: false, minlength: 2 },
  last_name: { type: String, required: false, minlength: 2 },
  password: { type: String, required: false, minlength: 2 },
  email: { type: String, required: false, minlength: 5 },
  profilePicUrl: { type: String },
  facebookId: { type: String },
  googleId: { type: String },
  date_created: { type: Date, required: false, default: Date.now() },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  outgoing_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  incoming_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  bio: { type: String, maxlength: 200 },
});
UserSchema.plugin(findOrCreate);
UserSchema.virtual('full_name')
  .get(() => `${this.first_name} ${this.last_name}`);

UserSchema.virtual('formatted_date_created')
  .get(() => { DateTime.fromJSDate(this.date_created).toLocaleString(DateTime.DATE_MED); });
module.exports = mongoose.model('User', UserSchema);
