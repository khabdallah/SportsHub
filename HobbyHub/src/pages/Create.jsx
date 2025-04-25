// src/pages/Create.jsx
import React, { useState } from 'react';
import { useNavigate }    from 'react-router-dom';
import { supabase }       from '../supabaseClient';

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle]       = useState('');
  const [content, setContent]   = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .insert({ title, content, image_url: imageUrl });
    if (error) console.error('Create error:', error);
    else       navigate('/');
  };

  return (
    <div className="page-container">
      <h1 className="post-title">New Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows="5"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
