
// app.js (or your main application file)
const express = require('express');
const app = express();

// Import the PostgreSQL library
const { Client } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Database connection configuration
const dbConfig = {
    user: process.env.DB_USER,     // Your PostgreSQL database username
    password: process.env.DB_PASSWORD, // Your PostgreSQL database password
    host: process.env.DB_HOST,     // Your PostgreSQL database host
    port: process.env.DB_PORT,     // Your PostgreSQL database port
    database: process.env.DB_NAME, // Your PostgreSQL database name
  };

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Route to get all students
app.get('/students', (req, res) => {
  // Query to fetch all students from the "student" table
  const query = 'SELECT * FROM student';

  // Execute the query
  client.query(query)
    .then((result) => {
      // Send the student data as the response
      res.json(result.rows);
    })
    .catch((err) => {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'An error occurred while fetching students.' });
    });
});

// Start the server
const port = 3000; // Replace this with your desired port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
