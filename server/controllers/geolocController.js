const fetch = require('node-fetch');
const geolocController = {};

//we want to simultaneously get the entire message history to display (get) and send the new data to the database
geolocController.getCurrentLoc = (req, res, next) => {
  fetch('http://api.ipapi.com/check?access_key=27d82b078a2d5598842730d3f96fd38e')
  .then(data => data.json())
  .then(data => {
    res.locals.locData = data;
    console.log(data);
    return next();
  })
  .catch(err => next(err));
}


module.exports = geolocController;