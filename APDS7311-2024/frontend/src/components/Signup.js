//components/signup
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = (e) => {
    e.preventDefault();

    axios.post('https://127.0.0.1:443/signup', {
      name,
      surname,
      email,
      password
    })
    .then(response => {
      alert(response.data); // Display welcome message
      navigate('/login'); // Redirect to /login after successful signup
    })
    .catch(error => {
      console.error('Error signing up', error);
      alert('Error signing up, please try again.');
    });
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Surname</label>
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
