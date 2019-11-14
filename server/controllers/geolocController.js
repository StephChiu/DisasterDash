const fetch = require('node-fetch');
const geolocController = {};

//we want to simultaneously get the entire message history to display (get) and send the new data to the database
geolocController.getCurrentLoc = (req, res, next) => {
  fetch('http://api.ipapi.com/check?access_key=27d82b078a2d5598842730d3f96fd38e')
  .then(data => data.json())
  .then(data => {
    res.locals.locData = data;
    // console.log(data);
    return next();
  })
  .catch(err => next(err));
}

geolocController.getEnteredLoc = (req, res, next) => {
  let cityName = req.params.name;
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyDbCLQ-BYyadZVx2F-jVsUTinb1gb8T3T0`)
  .then(data => data.json())
  .then(data => {
    console.log(data.results[0].geometry.location)
    res.locals.cityLoc = data.results[0].geometry.location;
    return next()
  })
  .catch(err => next(err));
}


module.exports = geolocController;