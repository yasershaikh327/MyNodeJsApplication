const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Install CORS first: npm install cors
const cors = require('cors');
app.use(cors()); // Enable Cross-Origin Requests

// *** NEW LINE *** //
// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// This is your API endpoint
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});