const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // Changed from 3000 to 3001

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World from Node.js!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the application`);
});

module.exports = app;