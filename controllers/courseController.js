const Course = require('../models/course');
const StudentCourse = require('../models/student_course');
const Student = require('../models/student');
const { Op } = require('sequelize');

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Fetch course details
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ course });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// get all courses for a student by students class
exports.getAllCoursesByClass = async (req, res) => {
    try {
        //    get student id from session
        console.log("debug");
        const studentId = req.session.studentId;
        console.log(studentId);
        const student = await Student.findByPk(studentId);
        const class_of_student = student.class;

        console.log(class_of_student);


        // Fetch course details
        const courses = await Course.findAll({
            where: { class: class_of_student },
        });

        if (!courses) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: 'Internal  server error' });
    }
}

// get all courses for a student by his query
exports.getAllCoursesByQuery = async (req, res) => {
    try {
        //    get student id from session
        const studentId = req.session.studentId;
        const student = await Student.findByPk(studentId);
        const class_of_student = student.class;

        const { query } = req.params;

        // Fetch course details
        const courses = await Course.findAll({
            where: { class: class_of_student, name: { [Op.like]: `%${query}%` } },
        });

        if (!courses) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


// get all courses for a student by  subject

// exports.getAllCoursesBySubject = async (req, res) => {
//     try {
//         //    get student id from session
//         const studentId = req.session.studentId;
//         const student = await Student.findByPk(studentId);
//         const class_of_student = student.class;
//         const { subject } = req.params;

//         // Fetch course details
//         const courses = await Course.findAll({
//             where: { class: class_of_student, subject: subject },
//         });

//         if (!courses) {
//             return res.status(404).json({ error: 'Courses not found' });
//         }

//         res.status(200).json({ courses });
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// enroll a student to a course

exports.enrollStudentToCourse = async (req, res) => {
    try {
        // take course id from body
        const  courseId  = req.body.courseId;
        //console.log(req.body);
        console.log(courseId);
        const studentId = req.session.studentId;
        //console.log(req.session);
        console.log(studentId);

        // check if student is already enrolled
        const student_course = await StudentCourse.findOne({
            where: { student_stu_id: studentId, course_course_id: courseId },
        });

        console.log(student_course);

        if (student_course) {
            return res.status(400).json({ error: 'Student already enrolled' });
        }

        //console.log("debug");
        // enroll student to course
        const student_course_enrollment = await StudentCourse.create({
            student_stu_id: studentId,
            course_course_id: courseId,
            rating: 0,
        });

        res.status(200).json({ student_course_enrollment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllEnrolledCourses = async (req, res) => {
    try {
        //    get student id from session
        const studentId = req.session.studentId;

        // Fetch course details
        const courses = await StudentCourse.findAll({
            where: { student_stu_id: studentId },
        });

        if (!courses) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}