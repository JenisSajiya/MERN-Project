// src/components/AddTransaction.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    paymentType: 'Cash', // Default payment type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentTypeChange = (e) => {
    setFormData({ ...formData, paymentType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const dataToSubmit = { ...formData, date: currentDate }; // Combine form data with date

    try {
      const res = await axios.post('http://localhost:5000/api/transactions', dataToSubmit);
      alert(res.data.message);
      // Clear form or redirect user if necessary
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div>
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Category:
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Rent">Rent</option>
              <option value="Loan">Loan</option>
              <option value="Travel">Travel</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>Payment Type:</label>
          <div>
            <label>
              <input
                type="radio"
                value="Cash"
                checked={formData.paymentType === 'Cash'}
                onChange={handlePaymentTypeChange}
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                value="Online Pay"
                checked={formData.paymentType === 'Online Pay'}
                onChange={handlePaymentTypeChange}
              />
              Online Pay
            </label>
          </div>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
