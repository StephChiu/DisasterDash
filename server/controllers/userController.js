const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const Session = require('../models/sessionModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    res.locals.users = users;
    return next();
  });
};

userController.createUser = (req, res, next) => {
  console.log('req.body --> ', req.body)
  const { username, password, email, city, state } = req.body;
  User.create({ username, password, email, city, state }, (err, doc) => {
    if (err) {
      console.log('error in userController.createUser')
    } else {
      console.log('successfully created User in DB')
      res.locals.id = doc._id;
      return next();
    }
  });
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username }, (err, doc)=>{
    if(err) {
      console.log()
      res.redirect('/main');
    }
    if (doc.length === 0) {
      console.log('Error: Unable to find User in DB')
      res.redirect('/main');
    } else {
      bcrypt.compare(password, doc[0].password, (error, match) => {
        if(error) { 
          return res.redirect('/main');
        } 
        if(match) {
          console.log('User entered correct password');
          res.locals.username = doc[0].username;
          res.locals.id = doc[0]._id;
          return next();
        }
        else { 
          res.redirect('/main');
        }
      });
    }
  });

};


userController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true});
  return next();
}

userController.isLoggedIn = (req, res, next) => {
  Session.find({cookieId: req.cookies.ssid}, (err, session) => {
    if (err) return next('Error in userController.isLoggedIn' + JSON.stringify(err));
    else if (!session.length) res.redirect('/signup') 
    else return next(); 
  })
};

userController.startSession = (req, res, next) => {
  const ssid = res.locals.id;
  Session.create({ cookieId: ssid }, (err, session)=> {
    if(err) return next('Error in userController.startSession', JSON.stringify(err));
    else return next();
  });
};

module.exports = userController;