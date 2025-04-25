import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Sports Forum</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/create" className="hover:underline">New Post</Link>
        </div>
      </div>
    </nav>
  )
}