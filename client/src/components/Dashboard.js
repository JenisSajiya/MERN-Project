// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/add-transaction">Add Transaction</Link></li>
          <li><Link to="/filter-transaction">Filter Transaction</Link></li>
          <li><Link to="/predict-future">Predict the Future</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
