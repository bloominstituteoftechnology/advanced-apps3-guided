import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function Articles(props) {
  const { articles, setError, getArticles } = props

  if (!localStorage.getItem('token')) {
    setError('be gone!!!!! You can not touch that')
    return <Navigate to="/" />
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        articles.map(art => {
          return (
            <div className="article" key={art.article_id}>
              <div>
                <h3>{art.title}</h3>
                <p>{art.text}</p>
                <p>topic: {art.topic}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
