const fetch = require('node-fetch');
const geolocController = {};
require('dotenv').config();

//we want to simultaneously get the entire message history to display (get) and send the new data to the database
geolocController.getCurrentLoc = (req, res, next) => {
  let geoLocKey = process.env.GEO_LOC_APIKEY
  fetch(`http://api.ipapi.com/check?access_key=${geoLocKey}`)
  .then(data => data.json())
  .then(data => {
    res.locals.locData = data;
    return next();
  })
  .catch(err => next(err));
}

geolocController.getEnteredLoc = (req, res, next) => {
  let cityName = req.params.name;
  let geoLocKey2 = process.env.GEO_LOC_APIKEY2;
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${geoLocKey2}`)
  .then(data => data.json())
  .then(data => {
    console.log(data.results[0].geometry.location)
    res.locals.cityLoc = data.results[0].geometry.location;
    return next()
  })
  .catch(err => next(err));
}


module.exports = geolocController;