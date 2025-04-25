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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="input w-full"
        />
      </div>
      <div>
        <label className="block">Content</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="textarea w-full"
        />
      </div>
      <div>
        <label className="block">Image URL</label>
        <input
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className="input w-full"
        />
      </div>
      <button type="submit" className="btn">Post</button>
    </form>
  )
}