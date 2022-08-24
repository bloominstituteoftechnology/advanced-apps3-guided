import React, { useState, useEffect } from 'react'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const { postArticle, currentArticle } = props

  const resetForm = () => {
    setValues(initialFormValues)
  }

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // look at currentArticle, PUT or POST
    postArticle(values, resetForm)
    setValues(initialFormValues)
  }

  useEffect(() => {
    if (currentArticle) {
      setValues(currentArticle) // if you want you can remove the article_id
    } else {
      setValues(initialFormValues)
    }
  }, [currentArticle])

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? 'Update' : 'Create'} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select id="topic" onChange={onChange} value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <button id="submitArticle">Submit</button>
    </form>
  )
}
