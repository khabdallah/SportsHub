import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts]     = useState([]);
  const [search, setSearch]   = useState('');
  const [sortField, setSortField] = useState('created_at');

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .ilike('title', `%${search}%`)
      // ALWAYS descending order so "Newest" = newest-first and "Most Upvoted" = highest-first
      .order(sortField, { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, sortField]);

  return (
    <div className="page-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      <div className="feed">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onUpvote={fetchPosts}
          />
        ))}
      </div>
    </div>
  );
}
