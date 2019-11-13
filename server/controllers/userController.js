const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

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
      console.log('Error: Unable to find User in DB')
    }
    else {
      bcrypt.compare(password, doc[0].password, (error, match) => {
        if(error) { 
          return res.redirect('/signup');
        } 
        if(match) {
          console.log('User entered correct password');
          res.locals.id = doc[0]._id;
          return next();
        }
        else { 
          alert("incorrect username and/or password");
        }
      });
    }
  });

};


module.exports = userController;