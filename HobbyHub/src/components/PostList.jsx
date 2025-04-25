import React from 'react'
import PostCard from './PostCard'

export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts found.</p>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  )
}