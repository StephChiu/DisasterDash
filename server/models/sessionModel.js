const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 36000000, default: Date.now }
});

const Session = mongoose.model('session', sessionSchema);
module.exports = Session;