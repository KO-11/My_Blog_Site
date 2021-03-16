const newsRouter = require('express').Router()
const NewsAPI = require('newsapi')

newsRouter.get('/', (req, res) => {
  const newsapi = new NewsAPI(`${process.env.NEWS_API_KEY}`);

  // query top headlines in the US in english from NewsAPI
  newsapi.v2.topHeadlines({
    language: 'en',
    country: 'us'
  }).then(response => {
    res.status(200).send(response.articles)
  });
})

module.exports = newsRouter