const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ... your other existing API routes and middleware ...

// Add this new route for getting the date and time
app.get('/api/date', (req, res) => {
  // Get the current date and time
  const currentDate = new Date().toISOString(); 
  // Formatting to a more readable string
  const formattedDate = new Date().toString(); 

  // Send the date back as JSON
  res.json({ 
    date: currentDate,
    readableDate: formattedDate 
  });
});

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// ... any other code you have, like app.listen ...
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});