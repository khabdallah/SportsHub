import React from 'react'
import CreatePost from '../components/CreatePost'

export default function Create() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">New Post</h1>
      <CreatePost />
    </div>
  )
}