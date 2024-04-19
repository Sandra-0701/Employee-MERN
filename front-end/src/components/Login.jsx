import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ userType }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/${userType}/login`, formData);
      localStorage.setItem('token', res.data.token);
      // Redirect or do something else after successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, clear form fields, etc.)
    }
  };

  return (
    <div>
      <h2>{userType === 'admin' ? 'Admin Login' : 'Employee Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
