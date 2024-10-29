import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();  // Hook to navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear the error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);  // Store token for authentication
      setErrorMessage(''); // Clear error message on successful login

      // Redirect to the dashboard after successful login
      navigate('/dashboard'); 

    } catch (error) {
      // Set error message based on the error response
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed'); // Display specific error message from server
      } else {
        setErrorMessage('An unexpected error occurred'); // Handle unexpected errors
      }
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Render error message */}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          value={formData.email} 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          value={formData.password} 
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
