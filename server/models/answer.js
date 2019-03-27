const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field should be fill']
  },
  description: {
    type: String,
    required: [true, 'Description field should be fill']
  },
  upvotes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  downvotes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer