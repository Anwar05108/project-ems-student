// CREATE TABLE public.question_answer (
//     question_id SERIAL PRIMARY KEY,
//     answer_script_url TEXT NOT NULL
// );
// write a model for question_answer

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const QuestionAnswer = db.define('question_answer', {
    question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    answer_script_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
