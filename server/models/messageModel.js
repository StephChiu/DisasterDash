const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const MONGO_URI = "mongodb+srv://StephChiu:Codesmith123@cluster0-ebyb8.mongodb.net/test?retryWrites=true&w=majority";

// // connect to database
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'DisasterDash.Users'
// })
// .then(() => console.log('Connected to Mongo DB.'))
// .catch(err => console.log(err));

//create new schema for the messages
const messageSchema = new Schema({
    user: String,
    message: String
})

const Message = mongoose.model('message', messageSchema);
module.exports = Message;
