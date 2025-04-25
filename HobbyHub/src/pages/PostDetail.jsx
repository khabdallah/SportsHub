// src/pages/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import UpvoteButton from '../components/UpvoteButton';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch post data
  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost(data);
    }
  };

  // Fetch comments for this post
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const content = newComment.trim();
    if (!content) return;

    const { error } = await supabase
      .from('comments')
      .insert({ post_id: id, content });
    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setNewComment('');
      fetchComments();
    }
  };

  // Delete this post and redirect home
  const handleDelete = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/');
    }
  };

  if (!post) {
    return <p>Loading…</p>;
  }

  return (
    <div className="page-container">
      <div className="post-detail">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-time">
          {new Date(post.created_at).toLocaleString(undefined, {
            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
          })}
        </p>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="detail-image"
          />
        )}

        <p className="post-content">{post.content}</p>

        {/* Upvote button (no reload) */}
        <UpvoteButton
            postId={post.id}
            currentCount={post.upvotes}
            onUpvoted={(updatedPost) => setPost(updatedPost)}
        />

        {/* Comments Section */}
        <section className="comments-section">
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment…"
            />
            <button type="submit">Post Comment</button>
          </form>

          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.id} className="comment">
                <p>{c.content}</p>
                <small>
                  {new Date(c.created_at).toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                  })}
                </small>
              </li>
            ))}
          </ul>
        </section>

        {/* Edit & Delete Actions */}
        <div className="detail-actions">
          <Link to={`/edit/${post.id}`} className="edit-link">
            Edit Post
          </Link>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}
