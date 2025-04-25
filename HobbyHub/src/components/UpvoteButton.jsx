import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function UpvoteButton({ post, setPost }) {
  const [loading, setLoading] = useState(false)

  async function handleUpvote() {
    setLoading(true)
    const { data } = await supabase.from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', post.id)
      .single()
    setPost(data)
    setLoading(false)
  }

  return (
    <button onClick={handleUpvote} disabled={loading} className="btn">
      👍 {post.upvotes}
    </button>
  )
}
