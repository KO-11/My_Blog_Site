import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Moment from'react-moment'

//create footer with links to news
const News = () => {
  const [news, setNews] = useState([])

  //request to get news from newsapi.org
  useEffect(() => {
    axios.get('/api/news')
      .then((results) => {
        setNews(results.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

//map the news articles form the external api
  return (
    <div className='news'>
      <div className='newsTitle'>Latest News</div>
        {news.map((article, index) => {
          return (
            <a key={index} href={`${article.url}`} target='_blank'>
              <div className='newsArticle'>
                <img src={article.urlToImage}/>
                <div className='articleInfo'>
                  <h3 className='articleTitle'>{article.title}</h3>
                  <Moment className='publishedAt' fromNow>{article.publishedAt}</Moment>
                </div>
                <div className='articleContent'>
                  <p style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{article.content}</p>
                </div>
              </div>
            </a>
          )
        })}
    </div>
  )
}

export default News;