const bodyParser = require('body-parser');
const express = require('express');
const mongo = require('mongo');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {
	PORT,
	DATABASE_URL
} = require('./config/config');
const {
	quiz,
	quizList
} = require('./models/quizModels');
const app = express();
const quizDBrouter = require('./quizDBrouter');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: true });


app.use(morgan('common'));
app.use(jsonParser);
app.use(urlParser);
app.use(express.static('public'));

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(bodyParser.json());
//app.use(bodyParser());


mongoose.Promise = global.Promise;


app.get('/getquizes', (req, res) => {
	quiz
		.find()
		.exec()
		.then(quizzes => {
			console.log("hello");
			console.log(quizzes);
			res.json(quizzes.map(quiz => quiz.apiRepr('list')));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'something went terribly wrong'
			});
		})
});


app.get('/getquiz', (req, res) => {
	quiz
		.findById(req.query.ID)
		.exec()
		.then(post => {
			console.log(post)
			res.json(post.apiRepr());
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'something went terribly wrong'
			});
		})
});


app.delete('/deletequiz', (req, res) => {
	quiz
		.findByIdAndRemove(req.query.ID)
		.exec()
		.then(() => {
			res.status(200).json({
				message: 'success'
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'something went terribly wrong'
			});
		});
});


app.post('/updatequizscore', (req, res) => {
	quiz
		.findByIdAndUpdate(req.query.ID, { $set: { Score: req.body.Score } }, { new: false })
		.exec()
		.then(() => {
			res.status(200).json({
				message: 'success'
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'something went terribly wrong'
			});
		});
});



//in progress 3/27
app.post('/addquiz', (req, res) => {
	// Verify required fields
	let {Title, Score, Questions} = req.body;

	console.log(Title);
	console.log(Score);
	console.log(Questions);
	quiz
		.create({
			Title: req.body.Title,
			Score: req.body.Score,
			Questions: req.body.Questions
		})
		.then((post) => {
			console.log(post);
			res.status(201).json(post.apiRepr().ID);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'something went terribly wrong'
			});
		});
});


let server;


function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
					console.log(`Your app is listening on port ${port}`);
					resolve();
				})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}


// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}
if (require.main === module) {
	runServer().catch(err => console.error(err));
};


module.exports = {
	runServer,
	app,
	closeServer
};


//end