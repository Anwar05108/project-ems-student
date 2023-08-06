// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Route to get exam details and questions
router.get('/:examId', examController.getExamDetails);

// Route to submit exam answers and calculate the score
router.post('/:examId/submit', examController.submitExamAnswers);

module.exports = router;
