const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly' });
});

// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
}); 