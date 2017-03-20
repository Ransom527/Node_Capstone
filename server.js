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
const HttpStatus = require('http-status-codes');

app.use(morgan('common'));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;


app.get('/getquizes', (req, res) => {
	quiz
		.find()
		.exec()
		.then(posts => {
			console.log(posts)
			res.json(posts.map(post => post.apiRepr('list')));
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
		//.then(() => {
		//	console.log('responding');
		//	var message = {
		//		message: 'success'
		//	};
		//	res.send(HttpStatus.OK, message);
		//})
		.then(() => {
			res.status(204).json({
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


app.post('/updatequiz', (req, res) => {
	//quiz
	//.findAndModify(req.query.ID)
	//.exec()
	//
});


app.post('/addquiz', quizDBrouter.post);


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