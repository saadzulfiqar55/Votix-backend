const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// After existing imports and app.use for auth
app.use('/api/elections', require('./routes/electionRoutes'));


// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('🚀 Server running on port 5000'));

app.use((err, req, res, next) => {
  console.error(err.stack); // logs full error stack trace in terminal
  res.status(500).json({ error: "Something broke!" });
});

