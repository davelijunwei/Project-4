import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Button, Col } from 'react-bootstrap'

function Main() {
  const [articles, setArticles] = useState([])
  async function getArticles(type) {
    console.log('test')
    try {
      let res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_ARTICLEKEY}`
      )
      console.log(res)
      setArticles(res.data.articles)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    //title
    //description
    // url
    articles.map((article) => (
      <Card>
        <Card.Img
          variant='top'
          src={article.urlToImage}
          style={{ width: '18rem' }}
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
        </Card.Body>
      </Card>
    ))
  )
}

export default Main
