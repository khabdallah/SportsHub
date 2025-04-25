// src/pages/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }       from 'react-router-dom';
import { supabase }                      from '../supabaseClient';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle]       = useState('');
  const [content, setContent]   = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // load existing
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Load error:', error);
      else {
        setTitle(data.title);
        setContent(data.content || '');
        setImageUrl(data.image_url || '');
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({ title, content, image_url: imageUrl })
      .eq('id', id);
    if (error) console.error('Update error:', error);
    else       navigate(`/post/${id}`);
  };

  return (
    <div className="page-container">
      <h1 className="post-title">Edit Post</h1>
      <form onSubmit={handleUpdate} className="post-form">
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
