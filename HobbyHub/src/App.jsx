import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-brand">🏅 Sports Forum</div>
        <div>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link">New Post</Link>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}