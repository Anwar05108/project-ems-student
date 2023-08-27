// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const jwtAuthMiddleware = require('../middleware/jwtAuth');

// Route to get exam details and questions
router.get('/:examId', examController.getExamDetails);

// Route to submit exam answers and calculate the score
router.post('/:examId/submit',jwtAuthMiddleware, examController.submitExamAnswers);

module.exports = router;
