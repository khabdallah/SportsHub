import React from 'react'

export default function CommentList({ comments }) {
  if (!comments.length) return <p>No comments yet.</p>
  return (
    <div className="space-y-2 mb-4">
      {comments.map(c => (
        <div key={c.id} className="p-2 border rounded">
          <p className="text-sm text-gray-500 mb-1">{new Date(c.created_at).toLocaleString()}</p>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  )
}