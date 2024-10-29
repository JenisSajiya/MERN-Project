// src/GoogleSignIn.js
import React from 'react';
import { auth, provider } from './components/firebase';
import { signInWithPopup } from 'firebase/auth';

const GoogleSignIn = () => {
    const handleGoogleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
      
          // Get the Firebase token
          const token = await user.getIdToken();
          console.log('Sending token to backend:', token);
      
          // Send the token to your backend
          const res = await axios.post('http://localhost:5000/auth/google', { token });
          
          alert(res.data.message);
        } catch (error) {
          console.error('Error signing in with Google:', error);
        }
      };
    
      
      
  

  return (
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignIn;
