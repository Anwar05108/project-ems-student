// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const examRouter = require('./routes/exam'); // Import the exam routes
const courseRouter = require('./routes/course');
const sequelize = require('./config/database');
const session = require('express-session');
const cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(cors());

// Session middleware
app.use(
  session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

const Student = require('./models/student');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use(express.json());

// Routes
app.use('/api/student/signup', signupRouter);
app.use('/api/student/signin', signinRouter);
app.use('/api/student/exam/mcq', examRouter); // Use the exam routes

app.use('/api/student/courses',courseRouter);
// Other routes and middleware...

const port = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error syncing database:', err);
});
