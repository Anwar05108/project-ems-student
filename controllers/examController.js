// controllers/examController.js
const Exam = require('../models/exam');
const Question = require('../models/question');
const QuestionExam = require('../models/question_exam');

exports.getExamDetails = async (req, res) => {
  try {
    const { examId } = req.params;

    // Fetch exam details
    const exam = await Exam.findByPk(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Fetch questions for the exam
    const questionExamEntries = await QuestionExam.findAll({
      where: { exam_exam_id: examId },
    });

    const questionIds = questionExamEntries.map((entry) => entry.question_question_id);

    // Fetch question details
    const questions = await Question.findAll({
      where: { question_id: questionIds },
    });

    res.status(200).json({ exam, questions });
  } catch (err) {
    console.error('Error in fetching exam details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// controllers/examController.js
exports.submitExamAnswers = async (req, res) => {
    try {
      const { examId } = req.params;
      const { answers } = req.body;

      // console.log(answers[1]);
  
      // Calculate the student's score
      let score = 0;
  
      const questionExamEntries = await QuestionExam.findAll({
        where: { exam_exam_id: examId },
      });

      // using the id of question from question exam table, fetch the correct answer from question table  
      for (const entry of questionExamEntries) {
        const questionId = entry.question_question_id;
        
        const question = await Question.findByPk(questionId);
        const correctAnswer = question.answer;
        const studentAnswer = answers[questionId];
  
        if (correctAnswer === studentAnswer) {
          score++;
        }
      }
  
      // Save the student's score to the database or use it as needed
      
  
      res.status(200).json({ score });
    } catch (err) {
      console.error('Error in submitting exam answers:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
