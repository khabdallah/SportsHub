import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => { loadPost() }, [])

  async function loadPost() {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    setTitle(data.title)
    setContent(data.content)
    setImageUrl(data.image_url)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await supabase.from('posts')
      .update({ title, content, image_url: imageUrl })
      .eq('id', id)
    navigate(`/post/${id}`)
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className="input" />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} className="textarea" />
        </div>
        <div>
          <label>Image URL</label>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="input" />
        </div>
        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  )
}