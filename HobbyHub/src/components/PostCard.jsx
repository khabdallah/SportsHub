import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="post-card">
      <h2>{post.title}</h2>
      <div className="timestamp">{new Date(post.created_at).toLocaleString()}</div>
      <div>🏆 {post.upvotes}</div>
    </Link>
  )
}