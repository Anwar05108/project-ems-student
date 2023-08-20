// controllers/examController.js
const Exam = require('../models/exam');
const Question = require('../models/question');
const QuestionExam = require('../models/question_exam');
const ExamStudent = require('../models/exam_student');

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

    // check the type of the question. keep only mcq type questions
    const mcqQuestions = questions.filter((question) => question.type === 'MCQ');

    res.status(200).json({ exam, mcqQuestions });
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
  
     
       // Save the student's score to the database
       console.log('checking session')
       console.log(req.session.studentId);
       console.log(req.session.studentName);
    const  stu_id  = req.session.studentId; // Assuming you have the student's ID from authentication middleware
    const obtainedMarks = score;

    const examStudentEntry = await ExamStudent.findOne({
      where: { exam_exam_id: examId, student_stu_id: stu_id },
    });

    if (examStudentEntry) {
      // If the entry already exists, update the obtained_marks value
      examStudentEntry.obtained_marks = obtainedMarks;
      await examStudentEntry.save();
    } else {
      // If the entry does not exist, create a new entry
      await ExamStudent.create({
        exam_exam_id: examId,
        student_stu_id: stu_id,
        obtained_marks: obtainedMarks,
      });
    }
     

  
      res.status(200).json({ score });
    } catch (err) {
      console.error('Error in submitting exam answers:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
