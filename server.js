const express = require('express');
const morgan = require('morgan');
let app = express();

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

const mongo = require('mongo');
const {
	PORT,
	DATABASE_URL
} = require('./config/config');


const quizDBrouter = require('./quizDBrouter');

console.log(quizDBrouter);
app = quizDBrouter.initialize(app);