const fetch = require('node-fetch');
const donateController = {}

donateController.getInfo = (req, res, next) => {
  let apiKey = `${process.env.REACT_APP_GG_APIKEY}`
  fetch(`https://api.globalgiving.org/api/public/services/search/projects.json?api_key=${apiKey}&q=${req.query.input}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      res.locals.results = data;
      return next();
    })
    .catch(err => next(err));
}

module.exports = donateController;