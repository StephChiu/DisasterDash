const fetch = require('node-fetch');
const axios = require('axios')
const newsController = {};

//getNews middleware scrapes titles and links from source sites, as specified in server.js
newsController.getNews = (req, res, next) => {
  let location = req.query.loc;
  location = location.replace(" ", "+");
  let disaster = req.query.dis;
  disaster = disaster.replace(" ", "+");
  const fetchAdd = `https://newsapi.org/v2/everything?qInTitle=${location}+${disaster}&sortBy=publishedAt&apiKey=27c7768c7a1044f9aeee364a9a5f6dfd`;
  fetch(fetchAdd)
  .then(body => body.json())
  .then(body =>{
    res.locals.allNews = body["articles"];
    return next();
  })
}

//getAlerts middleware scrapes top alerts from LAFD
  //this returns a single array of objects; not nested as returned by .getNews, as it's only scraping from one source
newsController.getAlerts = (req, res, next) => {
  const inputLocation = req.query.location || 'LosAngeles';
  const disaster = req.query.disaster;
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${disaster}%7C|${inputLocation}&type=video&key=AIzaSyB6prpiKLN2RWqJEwBQoOdYKZs-KmO66O4`
  axios.get(URL)
    .then(response => {
      console.log('GET ALERTS CONTROLLER -> ', response.data.items);
      res.send(response.data.items);
    })
    .catch(err => console.log('Error in getAlerts Controller : ', err))
}

module.exports = newsController;