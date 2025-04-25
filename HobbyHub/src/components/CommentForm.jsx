import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function CommentForm({ postId, onNewComment }) {
  const [content, setContent] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    await supabase.from('comments').insert({ post_id: postId, content })
    setContent('')
    onNewComment()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        placeholder="Add a comment..."
        className="textarea w-full"
      />
      <button type="submit" className="btn">Comment</button>
    </form>
  )
}
    