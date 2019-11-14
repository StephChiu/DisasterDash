const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const PORT = 3000;

// Web Sockets
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const newsController = require('./controllers/newsController');
const messageController = require('./controllers/messageController');
const userController = require('./controllers/userController');
const geolocController = require('./controllers/geolocController')

const MONGO_URI = 'mongodb+srv://StephChiu:Codesmith123@cluster0-ebyb8.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'DisasterDash'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }))

app.use(express.json());
app.use(express.static('assets'))


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/loc', geolocController.getCurrentLoc,(req,res)=> {
  res.status(200).json(res.locals.locData);
})

//'/main' route redirect
app.get('/main', (req, res) => {
  res.redirect('/')
});

// sign up route
app.post('/signup', userController.createUser, userController.setCookie, userController.startSession, (req, res) => {
  res.status(200).redirect('/main')
});

// login route
app.post('/login', userController.verifyUser, userController.setCookie, userController.startSession, (req, res) => {
  res.status(200).json(res.locals.username)
});

// Serve Particle SVG
app.get('/flare', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/assets/flame.svg'));
});
// '/news' route will respond with a nested array of arrays,
    //each nested array contains scraped data from sources LAFD, LA Times, and Youtube (respectively)
    //structured as follows:
    // [
    //     [ { title: 'LAFD Title', link: 'LAFD.com', picture: 'piclink.com' } ],
    //     [ { title: 'LA Times Title', link: 'LATimes.com', picture: 'piclink.com' } ],
    //     [ { title: 'Youtube Title', link: 'youtube.com', picture: 'piclink.com' } ]
    // ]

app.get('/news', newsController.getNews, (req, res) => {
  res.status(200).json(res.locals.allNews);
});
// '/alerts' route will respond with an array of alerts from LAFD: {title: 'Alert', link: 'www.alertLink.com'}
app.get('/alerts', newsController.getAlerts, (req, res) => {
  res.json(res.locals.alerts);
});

app.use('/build', express.static(path.join(__dirname, '../build')));


//chat start
//get the messages from the database to display them
app.get('/messages', messageController.getMessages, (req, res) => {
  res.json(res.locals.messages);
})
//post the messages to the database
app.post('/messages/create', messageController.postMessages, (req, res) => {
  res.json(res.locals.message);
})
//chat end


//404 handler
app.use('*', (req, res) => {
    res.sendStatus(404);
  });
//global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
});

// app.listen(PORT, () => {
//     console.log(`Server listening on port: ${PORT}`);
// });


// Web Sockets Implementation
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  })

  socket.on('chat', (data) => {
    console.log('MSG DATA -> ', data);
    io.sockets.emit('chat', data);
  });
});

http.listen(PORT, () => {
  console.log(`HTTP Server on :${PORT}`);
})

