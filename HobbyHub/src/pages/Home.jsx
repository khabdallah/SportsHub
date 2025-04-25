import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import PostList from '../components/PostList'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('created_at')

  useEffect(() => {
    fetchPosts()
  }, [search, sort])

  async function fetchPosts() {
    let query = supabase.from('posts').select('*')
      .order(sort, { ascending: false })
    if (search) {
      query = query.ilike('title', `%${search}%`)
    }
    const { data, error } = await query
    if (!error) setPosts(data)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Link to="/create" className="btn">Create Post</Link>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search titles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input"
          />
          <select value={sort} onChange={e => setSort(e.target.value)} className="select">
            <option value="created_at">Newest</option>
            <option value="upvotes">Top</option>
          </select>
        </div>
      </div>
      <PostList posts={posts} />
    </div>
  )
}