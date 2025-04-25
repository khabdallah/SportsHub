import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useParams, Link, useNavigate } from 'react-router-dom'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import UpvoteButton from '../components/UpvoteButton'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  async function fetchPost() {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    setPost(data)
  }

  async function fetchComments() {
    const { data } = await supabase.from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data)
  }

  async function handleDelete() {
    await supabase.from('posts').delete().eq('id', id)
    navigate('/')
  }

  if (!post) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(post.created_at).toLocaleString()}</p>
      {post.image_url && <img src={post.image_url} alt="Post" className="mb-4 max-w-full" />}
      <p className="mb-4">{post.content}</p>
      <div className="flex items-center space-x-2 mb-4">
        <UpvoteButton post={post} setPost={setPost} />
        <Link to={`/edit/${id}`} className="btn">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
      <CommentList comments={comments} />
      <CommentForm postId={id} onNewComment={fetchComments} />
    </div>
  )
}
