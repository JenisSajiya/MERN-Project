// src/components/FilterTransaction.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const FilterTransaction = () => {
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('month'); // 'month' or 'category'
  const [categoryData, setCategoryData] = useState([]); // To store category-wise expense data

  const fetchExpenses = async (filter) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions`, { params: filter });
      setExpenses(response.data);
      calculateCategoryData(response.data); // Calculate category data when fetching expenses
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const calculateCategoryData = (expenses) => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    // Prepare data for pie chart
    const chartData = Object.keys(categoryTotals).map((key) => ({
      name: key,
      value: categoryTotals[key],
    }));
    setCategoryData(chartData);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filter = activeTab === 'month' ? { month: parseInt(month, 10) } : { category };
    fetchExpenses(filter);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMonth(''); // Reset month filter
    setCategory(''); // Reset category filter
    setExpenses([]); // Clear expenses when switching tabs
    setCategoryData([]); // Clear category data when switching tabs
  };

  return (
    <div>
      <h1>Filter Transactions</h1>
      <div>
        <button onClick={() => handleTabChange('month')}>Month</button>
        <button onClick={() => handleTabChange('category')}>Category</button>
      </div>

      <form onSubmit={handleFilterSubmit}>
        {activeTab === 'month' && (
          <div>
            <label>
              Month:
              <select value={month} onChange={(e) => setMonth(e.target.value)} required>
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </label>
          </div>
        )}
        {activeTab === 'category' && (
          <div>
            <label>
              Category:
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Rent">Rent</option>
                <option value="Loan">Loan</option>
                <option value="Travel">Travel</option>
              </select>
            </label>
          </div>
        )}
        <button type="submit">Filter</button>
      </form>

      <h2>Filtered Expenses</h2>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense._id}>
              {expense.date} - {expense.category} - ${expense.amount} - {expense.paymentType}
            </li>
          ))
        ) : (
          <li>No expenses found for the selected filter.</li>
        )}
      </ul>

      {/* Pie Chart Visualization */}
      <h2>Category Wise Visualization</h2>
      {categoryData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(${(index * 360) / categoryData.length}, 100%, 50%)`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data available for visualization.</p>
      )}
    </div>
  );
};

export default FilterTransaction;
