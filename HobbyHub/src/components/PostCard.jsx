// src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import UpvoteButton from './UpvoteButton';

export default function PostCard({ post, onUpvote }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`} className="post-link">
        <h2 className="post-title">{post.title}</h2>
      </Link>
      <div className="post-meta">
        <span className="post-time">
          {new Date(post.created_at).toLocaleString(undefined, {
            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
          })}
        </span>
        <UpvoteButton
          postId={post.id}
          currentCount={post.upvotes}
          onUpvoted={() => onUpvote()}
        />
      </div>
    </div>
  );
}
