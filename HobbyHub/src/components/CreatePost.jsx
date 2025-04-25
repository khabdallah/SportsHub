import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const { data } = await supabase.from('posts')
      .insert({ title, content, image_url: imageUrl })
      .single()
    navigate(`/post/${data.id}`)
  }

  return (
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
      <button type="submit" className="btn">Post</button>
    </form>
  )
}