import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBlog = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState({ title: '', post: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchBlogById(); 
  }, [id]);


  const fetchBlogById = async () => {
    try {
      const response = await axios.get(`https://localhost:443/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      setBlog(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error("There was an error fetching the blog!", error);
      setLoading(false); 
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value }); 
  };

 
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://localhost:443/update/${id}`, blog, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      alert('Blog updated successfully');
      navigate('/'); 
    } catch (error) {
      console.error("There was an error updating the blog!", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Blog</h1>
      <form onSubmit={handleUpdateSubmit}>
        <label>Title:
          <input type="text" name="title" value={blog.title} 
          onChange={handleInputChange} required />
        </label> <br />
        <label>Post:
          <textarea name="post" value={blog.post} onChange={handleInputChange} required />
        </label> <br />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
