const bcrypt = require('bcrypt');
const Student = require('../models/student');

exports.signin = async (req, res) => {
  try {
    const { stu_id, password } = req.body;

    // Validate input data (check for missing fields)
    if (!stu_id || !password) {
      return res.status(400).json({ error: 'Student ID and password are required' });
    }

    // Find the student by "stu_id"
    const student = await Student.findOne({ where: { stu_id } });

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Password is valid, student is authenticated
    // Now, you can set the student's information in the session
    console.log('Student authenticated:', student.stu_id);
    req.session.studentId = student.stu_id;
    req.session.studentName = student.name;

    // res.cookie('sessionID', req.sessionID, {
    //   httpOnly: true,
    //   maxAge: 3600000, 
    //   // secure: true,
    // });

    res.status(200).json({ message: 'Authentication successful', data: student });
  } catch (err) {
    console.error('Error in signin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
