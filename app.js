// app.js
const express = require('express');
const app = express();
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const sequelize = require('./config/database'); // Import the Sequelize connection
require('dotenv').config(); // Load environment variables from .env

// Import the Student model
const Student = require('./models/student');

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Middleware
app.use(express.json());

// Routes
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

// Other routes and middleware...

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error syncing database:', err);
});
