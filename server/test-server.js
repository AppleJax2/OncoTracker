const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly' });
});

// Root route
app.get('/', (req, res) => {
  res.send('API is running - Test Server');
});

// Start server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
}

// Export the app for potential use in other files
module.exports = app; 