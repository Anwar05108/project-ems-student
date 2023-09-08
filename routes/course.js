const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const jwtAuthMiddleware = require('../middleware/jwtAuth');

// route to deduct marks


router.get('/getallEnrolledCourses', jwtAuthMiddleware, courseController.getAllEnrolledCourses);

router.get('/getallCoursesbyclass', jwtAuthMiddleware, courseController.getAllCoursesByClass);
// Route to get course details by course ID

// Route to enroll in a course by course ID
router.post('/enroll', jwtAuthMiddleware, courseController.enrollStudentToCourse);
// Route to get course details by query
router.get('/getallCoursesbyquery/:query', courseController.getAllCoursesByQuery);


// Route to get course details by course ID
router.get('/:courseId', courseController.getCourseDetails);

// router.get('/getallCoursesbySubject', courseController.getAllCoursesBySubject);

// route to get all enrolled courses of a student

module.exports = router;
