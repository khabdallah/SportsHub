import React from 'react'
import PostCard from './PostCard'

export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts found.</p>
  return <div className="grid">{posts.map(p => <PostCard key={p.id} post={p} />)}</div>
}