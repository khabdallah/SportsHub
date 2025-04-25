import React from 'react'

export default function CommentList({ comments }) {
  if (!comments.length) return <p>No comments yet.</p>
  return (
    <div style={{ marginBottom: '2rem' }}>
      {comments.map(c => (
        <div key={c.id} className="comment">
          <div className="timestamp">{new Date(c.created_at).toLocaleString()}</div>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  )
}
