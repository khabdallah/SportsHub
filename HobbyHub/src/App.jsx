import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import Create       from './pages/Create';
import PostDetail   from './pages/PostDetail';
import EditPost     from './pages/EditPost';
import './index.css';   // make sure this import is here

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/create"   element={<Create />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
