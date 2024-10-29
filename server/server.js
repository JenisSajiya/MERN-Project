const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin'); // Import Firebase Admin SDK
const serviceAccount = require('./config/serviceAccountKey.json'); // Import your service account key
const Transaction = require('./models/Transaction'); // Import Transaction model

// Configure environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Use the service account key
});

// Middleware to verify Google token
app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Handle user login or signup logic here
    res.status(200).send({ message: 'User authenticated', uid });
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).send({ message: 'Unauthorized', error: error.message });
  }
});

// New route to add a transaction
app.post('/api/transactions', async (req, res) => {
  const { date, category, amount, paymentType } = req.body;

  try {
    const transaction = new Transaction({ date, category, amount, paymentType });
    await transaction.save(); // Save transaction to the database
    res.status(201).send({ message: 'Transaction added successfully' });
  } catch (error) {
    console.error('Error adding transaction:', error.message);
    res.status(400).send({ message: 'Error adding transaction', error: error.message });
  }
});
// New route to get filtered transactions
app.get('/api/transactions', async (req, res) => {
  const { month, category } = req.query;

  const filter = {};
  if (month) {
    // Convert month (1-12) to a Date range for filtering
    const start = new Date(new Date().getFullYear(), month - 1, 1); // First day of the month
    const end = new Date(new Date().getFullYear(), month, 1); // First day of the next month
    filter.date = { $gte: start, $lt: end }; // Filter for the entire month
  }
  if (category) {
    filter.category = category;
  }

  try {
    const transactions = await Transaction.find(filter);
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
