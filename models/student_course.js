const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class StudentCourse extends Model { }

StudentCourse.init(
    {
        student_stu_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        course_course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DOUBLE,
            
        },
    },
    {
        sequelize,
        modelName: 'StudentCourse',
        tableName: 'student_course',
        timestamps: false,
    }
);

module.exports = StudentCourse;


