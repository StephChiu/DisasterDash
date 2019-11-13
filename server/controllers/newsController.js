const scraper = require('../utils/scraper');
const fetch = require('node-fetch');
const newsController = {};

//getNews middleware scrapes titles and links from source sites, as specified in server.js
newsController.getNews = (req, res, next) => {
  let location = req.query.loc;
  console.log('loc', location);
  let disaster = req.query.dis;
  console.log('dis', disaster);
  console.log(`https://newsapi.org/v2/top-headlines?q=${location, disaster}&apiKey=API_KEY`);
  fetch(`https://newsapi.org/v2/top-headlines?q=${location, disaster}&apiKey=API_KEY`)
  .then(body => body.json())
  .then(body =>{
    console.log(body);
    next();
  })
}

//getAlerts middleware scrapes top alerts from LAFD
  //this returns a single array of objects; not nested as returned by .getNews, as it's only scraping from one source
newsController.getAlerts = (req, res, next) => {
  const LAFDAlerts = new Promise((resolve, reject) => {
    scraper
      .scrapeLAFDAlerts()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('LAFD alerts scrape failed'))
  })
  
  Promise.all([ LAFDAlerts ])
    .then(data => {
      res.locals.alerts = data[0];
      next()
    })
    .catch(err => res.status(500).send(err))
}

module.exports = newsController;