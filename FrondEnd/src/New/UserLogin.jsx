// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import "../css/register.css"
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      setUser({ name: response.data.name });
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log('There was an error logging in the user!', error);
    }
  };
  return (
    <div className="min-reg">
    <form onSubmit={handleSubmit} className='form'>
      <h2>Login</h2>
      <div className="in">
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="in">
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="in">
      <button type="submit">Login</button>
      </div>
    </form>
    </div>
  );
};

export default Login;
