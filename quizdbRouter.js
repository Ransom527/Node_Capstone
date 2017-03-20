const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const quiz = require('./models/quizModels')

mongoose.Promise = global.Promise;


module.exports = {
	list: (req, res) => {
		//Not currently used...
		quiz		
			.find()
			.exec()
			.then(posts => {
				res.json(posts.map(post => post.apiRepr()));
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({
					error: 'something went terribly wrong'
				});
			});
	},
	post: (req, res) => {
		//
	},
	get: (req, res) => {
		//
	},
	put: (req, res) => {
		//
	},
	delete: (req, res) => {
		//
	},
};


/*
app.post('addquiz', (req, res) => {
			//
}
*/


/*
app.post('/posts', (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    })
    .then(blogPost => res.status(201).json(blogPost.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

module.exports = {
	initialize: function(app) {
		app.get('/getquizes', this.getQuizes);
		app.get('/getquiz', this.getQuiz);
		//app.get('/getquestion', this.getQuestion);
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
		quizModels.getQuizes().then(
			quizes => {
				res.json(quizes.map(quiz => quiz.apiRepr() ) );
			});
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
*/