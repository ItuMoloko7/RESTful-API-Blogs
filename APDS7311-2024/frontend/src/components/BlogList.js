import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get('https://localhost:443/', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blogs!", error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://127.0.0.1:443/removeblog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send the token in the Authorization header
        }
      });
      setBlogs(blogs.filter(blog => blog._id !== id)); // Remove the deleted blog from the list
      alert('Blog deleted successfully');
    } catch (error) {
      console.error("There was an error deleting the blog!", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog, index) => (
        <div key={index}>
          <h2>{blog.title}</h2>
          <p>{blog.post}</p>
          <p>Posted: {blog.when}</p>
          <button onClick={() => handleDelete(blog._id)}>Delete</button>
          <button onClick={() => handleUpdate(blog._id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
