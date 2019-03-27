const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field should be fill']
  },
  description: {
    type: String,
    required: [true, 'Description field should be fill']
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question