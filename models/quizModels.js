const mongoose = require('mongoose');


module.exports = {
  quiz: {
    Title: '',
    ID: '',
    Score: 0,
    Questions: []
  },
  getQuiz: function(ID) {
    return quiz.find({
      ID: ID
    }, function(err, quiz) {
      if (err) {
        return undefined;
      }
      return quiz;
    });
  },
  getQuizes: function() {
    return quiz.find();
  }
};


