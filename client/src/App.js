// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import FilterTransaction from './components/FilterTransaction';
import PredictFuture from './components/PredictFuture';
import './App.css'; // Import App.css for global styles

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => navigate('/signup')}>Signup</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/filter-transaction" element={<FilterTransaction />} />
        <Route path="/predict-future" element={<PredictFuture />} />
      </Routes>
    </Router>
  );
}

export default App;
