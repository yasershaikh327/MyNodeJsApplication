const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// Install CORS first: npm install cors
const cors = require('cors');
app.use(cors()); // Enable Cross-Origin Requests
// Serve static files (like index.html) from the 'public' directory
app.use(express.static('public'));

// This handles ALL requests to ANY path and sends "Hello World!"
// Add this API endpoint
app.get('/api/message', (req, res) => {
  // This is the data your HTML page will fetch
  const dataFromServer = {
    message: "Hello from the server!",
    timestamp: new Date().toISOString(),
    status: "success"
  };
  // Send it as JSON
  res.json(dataFromServer);
});


// Add this route for the root URL '/'
app.get('/', (req, res) => {
  res.send('Welcome to my API! Go to /api/message to get data.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});