const express = require('express');
const router = express.Router();


const quizModels = require('./models/quizModels')
console.log(quizModels);

module.exports = {
	initialize: function(app) {
		app.get('/getquizes', this.getQuizes);
		app.get('/getquiz', this.getQuiz);
		//app.get('/getquestion', quizRoutes.getQuestion);
		app.get('/getanswer', this.getAnswer);
		app.post('/savehighscore', this.saveHighScore);
		app.post('/addquiz', this.addQuiz);
		return app;
	},
	getQuestion: function(req, res) {
		res.json(quizModels.getQuestion(req.params.quizid, req.params.questionid));
	},
	getQuiz: function(req, res) {
		res.json(quizModels.getQuiz(req.params.id));
	},
	getQuizes: function(req, res) {
		res.json(quizModels.getQuizes());
	},
	getAnswer: function(req, res) {
		//
	},
	addQuiz: function(req, res) {
		//
	},
	saveHighScore: function(req, res) {
		//
	}

}