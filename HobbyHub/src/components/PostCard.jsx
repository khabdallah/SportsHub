import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="block p-4 border rounded-lg hover:shadow">
      <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(post.created_at).toLocaleString()} • {post.upvotes} upvotes
      </p>
    </Link>
  )
}