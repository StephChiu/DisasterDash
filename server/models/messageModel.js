const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new schema for the messages
const messageSchema = new Schema({
    user: String,
    message: String
})

const Message = mongoose.model('message', messageSchema);
module.exports = Message;
