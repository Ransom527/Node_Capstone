const express = require('express');
const morgan = require('morgan');

const app = express();



app.get('/quizdb', quizdb.get);

//

app.use(morgan('common'));

// you need to import `blogPostsRouter` router and route
// requests to HTTP requests to `/blog-posts` to `blogPostsRouter`

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

/*
var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
*/