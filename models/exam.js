// models/exam.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Exam extends Model { }

Exam.init(
  {
    exam_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    class: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_marks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    course_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Exam',
    tableName: 'exam',
    timestamps: false,
  }
);

module.exports = Exam;
