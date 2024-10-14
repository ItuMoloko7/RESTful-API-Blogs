//component/login
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('https://127.0.0.1:443/login', {
      email, password
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/'); 
    })
    .catch(error => {
      console.error('Login failed', error);
      alert('Login failed. Please check your email or password.');
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
