import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormStyles.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    address: '',
    institut: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'course' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', formData);
      alert('Registration successful! You can now login.');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        <label>Course:</label>
        <input type="number" name="course" value={formData.course} onChange={handleChange} />
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        <label>Institut:</label>
        <input type="text" name="institut" value={formData.institut} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
