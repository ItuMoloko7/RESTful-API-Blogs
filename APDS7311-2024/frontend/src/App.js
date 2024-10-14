//app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import UpdateBlog from './components/UpdateBlog';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Render home page content directly */}
          <Route path="/" element={<BlogList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
