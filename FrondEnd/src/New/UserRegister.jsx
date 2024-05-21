// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import "../css/register.css"
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  });
const navigate=useNavigate();
  // const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', formData);

      navigate('/login');
    } catch (error) {
      console.log('There was an error registering the user!', error);
    }
  };

  return (
    <div className="main-reg">  
    <form onSubmit={handleSubmit} className='form'>
      <h2>Register</h2>
      <div className="in">

      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="in">
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="in">
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="in">
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div className="in">
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="in">
      <button type="submit">Register</button>
      </div>
    </form>
    </div>
  
  );
};

export default Register;
