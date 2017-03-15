const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  Title: '',
  ID: '',
  Score: 0,
  Questions: []
});

const quizListSchema = mongoose.Schema({
  Title: '',
  ID: '',
  Score: 0
});

quizSchema.methods.apiRepr = function(type) {
  if (type === 'list') {
    return {
      Title: this.Title,
      ID: this._id,
      Score: this.Score
    }
  } else {
    return {
      Title: this.Title,
      ID: this._id,
      Score: this.Score,
      Questions: this.Questions
    };
  }
}

const quiz = mongoose.model('quizappdbs', quizSchema);

module.exports = {
  quiz
};
