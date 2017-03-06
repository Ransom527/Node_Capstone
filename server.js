const express = require('express');
const morgan = require('morgan');
const app = express();

const mongo = require('mongo');
const mongoose = require('mongoose');
const {
	PORT,
	DATABASE_URL
} = require('./config/config');



var quizData = [{
		Title: 'General Knowledge',
		ID: '01',
		Score: 0,
		Questions: [{
			Title: 'The infamous "Konami Code" first appeared in which game?',
			Choices: ['Contra', 'Sidewinder', 'Mega Zone', 'Gradius'],
			Answer: 'Gradius'
		}, {
			Title: 'Nintendo of America is the majority owner of which sports team?',
			Choices: ['San Francisco Giants', 'Seattle Seahawks', 'Seattle Mariners', 'Chicago Cubs'],
			Answer: 'Seattle Mariners'
		}, {
			Title: 'What was the name of the most expesive video game platform ever released?',
			Choices: ['3DO', 'Neo Geo AES', 'Phillips CD-i', 'Pioneer LaserActive'],
			Answer: 'Pioneer LaserActive'
		}, {
			Title: 'What was the name of the camera peripheral for the Sega Dreamcast, only released in Japan?',
			Choices: ['DreamSnap', 'SegaCam', 'Dreameye', 'WebCast'],
			Answer: 'Dreameye'
		}, {
			Title: 'Who recorded the voice of Cortana in Halo?',
			Choices: ['Jim Morrison', 'Joanna Lumley', 'Jen Taylor', 'Lana Del Rey'],
			Answer: 'Jen Taylor'
		}, {
			Title: 'Super Mario Bros: The Lost Levels was originally going to be released as which game?',
			Choices: ['Super Mario Bros. 4', 'It was never released.', 'Super Mario Bros. 2', 'Super Mario World'],
			Answer: 'Super Mario Bros. 2'
		}, {
			Title: 'Super Mario Bros. 2 was origially developed as which game, before it was adapted and renamed?',
			Choices: ['Super Mario Bros. 3', 'Doki Doki Panic', 'Garden of Chaos', 'Kirbys Adventure'],
			Answer: 'Doki Doki Panic'
		}, {
			Title: '',
			Choices: ['', '', '', ''],
			Answer: ''
		}]
	}, {
		Title: 'Nintendo 64',
		ID: '02',
		Score: 0,
		Questions: [{
			Title: 'What was the name of the eagerly awaited add-on for the Nintedo 64, only realeased in Japan?',
			Choices: ['N64 DD', 'iQue Player', 'Satellaview', 'Ultra 64'],
			Answer: 'N64 DD'
		}, {
			Title: 'Hyundai released the Nintedo 64 in South Korea under a different name due to import restrictions, what was it called?',
			Choices: ['Ultra 64', 'Comboy 64', 'iQue Player', 'Famicom'],
			Answer: 'Comboy 64'
		}, {
			Title: 'What was the development codename for the Nintendo 64?',
			Choices: ['Project 64', 'New Horizons', 'Project Reality', 'Goldfinger'],
			Answer: 'Project Reality'
		}, {
			Title: 'What was the original name of the Nintendo 64, whcih was teased at Shoshinkai in 1994?',
			Choices: ['Mega 64', 'Master System', 'Ultra 64', 'Manic 64'],
			Answer: 'Ultra 64'
		}]
	}, {
		Title: 'Gamecube',
		ID: '03',
		Score: 0,
		Questions: [{
			Title: 'What was the development codename for the Nintendo Gamecube?',
			Choices: ['Swordfish', 'Dolphin', 'Rhino', 'Panther'],
			Answer: 'Dolphin'
		}, {
			Title: 'What was the name of the combination GameCube/DVD player?',
			Choices: ['Panasonic Q', 'Comboy GC', 'iQue Player', 'GC Master System'],
			Answer: 'Panasonic Q'
		}]
	}, {
		Title: 'Super Nintendo',
		ID: '04',
		Score: 0,
		Questions: [{
				Title: 'What was name of the unreleased CD-ROM add-on for the Super Nintendo?',
				Choices: ['Super Disc', 'Mega-CD', 'Playstation', 'Nintendo CD'],
				Answer: 'Super Disc'
			}, {
				Title: 'What was the name of the add-on satellite receiver for the SNES released only in Japan?',
				Choices: ['OnStar', 'SuperSat', 'Satellaview', 'BS-X'],
				Answer: 'Satellaview'
			}] // End of Game object
	}] // End of quizData

//routing
//models
//endpoint


app.get('/quizdb', function(req, res) {
	res.json({
		msgId: 'Hello World'
	})
});

app.get('/quizes', function(req, res) {
	res.json(quizData[]);
});

app.get('/questions', function(req, res) {
	res.json(quizData.Quizes[req.query.quizid]);
	//try.catch if reqpramid is undefined
});


app.get('/getanswer', function(req, res) {
	res.json(quizData.Quizes[req.query.quizid][req.query.questionid].Answer);
});


app.post('/addquiz', function(req, res) {
	quizData.Quizes[req.body.id] = req.body.quiz;
	res.status(200).end();
});

/*
app.post('/updatequiz', function(req, res) {

});

app.delete('/deletequiz', function(req, res) {

});
*/

// add user/pw mongodb functionality

//app.get('/blog-posts', blogPostsRouter.get);

//app.post('/blog-posts', blogPostsRouter.post);

//app.delete('/blog-posts/:id', blogPostsRouter.delete);

//app.put('/blog-posts/:id', blogPostsRouter.put);


app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});