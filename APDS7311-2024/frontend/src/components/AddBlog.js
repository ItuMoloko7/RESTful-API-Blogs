//components/addBlog
import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://127.0.0.1:443/addblog', { title, post }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      alert('Blog added successfully!');
    })
    .catch(error => {
      console.error('There was an error adding the blog!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Post</label>
        <textarea value={post} onChange={(e) => setPost(e.target.value)} />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlog;
