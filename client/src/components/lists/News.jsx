import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Moment from'react-moment'

//create footer with links to news
const News = () => {
  const [news, setNews] = useState([])

  //request to get news from hacker news
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
        {news.map((article) => {
          return (
            <a href={`${article.url}`} target='_blank'>
              <div className='newsArticle'>
                <img src={article.urlToImage}/>
                <div className='articleInfo'>
                  <h3 className='articleTitle'>{article.title}</h3>
                  <Moment className='publishedAt' fromNow>{article.publishedAt}</Moment>
                </div>
                <div className='articleContent'>
                  <p style={{whiteSpace: "pre-wrap"}}>{article.content}</p>
                </div>
              </div>
            </a>
          )
        })}
    </div>
  )
}

export default News;