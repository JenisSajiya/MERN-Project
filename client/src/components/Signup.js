import React, { useState } from 'react';
import axios from 'axios';
import { auth, provider } from './firebase'; // Import Firebase auth and provider
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup from Firebase
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // For error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Use navigate to redirect after successful signup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const res = await axios.post('http://localhost:5000/auth/signup', formData);
      alert(res.data.message);
      setLoading(false); // Stop loading after response
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      setLoading(false); // Stop loading on error
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.'); // Specific error message
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Set loading to true
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google
      const user = result.user; // Get user info from the result
      console.log('User Info:', user); // Log user info or handle accordingly

      // Get the Firebase token
      const token = await user.getIdToken();

      // Send the token to your backend
      const res = await axios.post('http://localhost:5000/auth/google', { token });

      alert(res.data.message); // Show success message from backend
      setLoading(false); // Stop loading after success
      navigate('/dashboard'); // Redirect to dashboard after Google signup
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error('Error signing in with Google:', error);
      setErrorMessage('Google Sign-In failed. Please try again.'); // Display error message
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Render error message */}
      {loading ? (
        <div>Loading...</div> // Show loading indicator when loading
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Signup</button>
        </form>
      )}
      <button onClick={handleGoogleSignIn} disabled={loading}> {/* Disable Google button when loading */}
        {loading ? 'Signing up...' : 'Sign up with Google'}
      </button>
    </div>
  );
};

export default Signup;
