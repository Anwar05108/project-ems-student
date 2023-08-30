// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const jwtAuthMiddleware = require('../middleware/jwtAuth');

// Route to get exam details and questions
router.get('/mcq/:examId', examController.getExamDetails);

// Route to get exam details and questions for written exam
router.get('/written/:examId', examController.getWrittenExamDetails);

// Route to submit exam answers and calculate the score
router.post('/mcq/:examId/submit',jwtAuthMiddleware, examController.submitExamAnswers);

router.post('/written/:examId/submit',jwtAuthMiddleware, examController.submitWrittenExamAnswers);


module.exports = router;
