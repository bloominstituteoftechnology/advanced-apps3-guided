import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import ArticleForm from './ArticleForm'
import axiosWithAuth from '../axios'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState(null)
  const [spinnerOn, setSpinnerOn] = useState(false)

  const navigate = useNavigate()

  const login = ({ username, password }) => {
    axios.post(loginUrl, { username, password })
      .then(res => {
        const { token } = res.data
        localStorage.setItem('token', token)
        navigate('/articles')
      })
      .catch(err => {
        debugger
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const getArticles = () => {
    axiosWithAuth().get(articlesUrl)
      .then(res => {
        setArticles(res.data.articles)
      })
      .catch(err => {
        debugger
      })
  }

  const postArticle = (article) => {
    axiosWithAuth().post(articlesUrl, article)
      .then(res => {
        const { article } = res.data
        setArticles(articles.concat(article))
      })
      .catch(err => {
        debugger
      })
  }

  const deleteArticle = (article_id) => {
    axiosWithAuth().delete(`${articlesUrl}/${article_id}`)
      .then(res => { // eslint-disable-line
        setArticles(articles.filter(art => (art.article_id != article_id)))
      })
      .catch(err => {
        debugger
      })
  }

  const putArticle = (article) => {
    const { article_id } = article
    axiosWithAuth().put(`${articlesUrl}/${article_id}`, article)
      .then(res => {
        const updatedArticle = res.data.article
        setArticles(articles.map(
          art => (art.article_id === article_id) ? updatedArticle : art
        ))
        setCurrentArticleId(null)
      })
      .catch(err => {
        debugger
      })
  }

  return (
    <>
      <button id="logout" onClick={logout}>Logout</button>
      <h1>Advanced Applications</h1>
      <nav>
        <NavLink id="loginScreen" to="/">Login</NavLink>
        <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="articles" element={
          <>
            <ArticleForm
              postArticle={postArticle}
              putArticle={putArticle}
              currentArticle={articles.find(art => (art.article_id === currentArticleId))}
            />
            <Articles
              articles={articles}
              getArticles={getArticles}
              deleteArticle={deleteArticle}
              setCurrentArticleId={setCurrentArticleId}
            />
          </>
        } />
      </Routes>
    </>
  )
}
