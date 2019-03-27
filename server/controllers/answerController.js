const Answer = require('../models/answer');
const errorCatcher = require('../helpers/errorCatcher');

class AnswerController {

  static read (req, res) {
    Answer
      .find({})
      .then(answers => {
        res.status(200).json({
          answers: answers
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static readByQuestionId (req, res) {
    Answer
      .find({
        questionId: req.params.id
      })
      .then(answers => {
        res.status(200).json({
          answers: answers
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static update (req, res) {
    Answer
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
      }, { new: true })
      .then(answer => {
        res.status(200).json({
          message: `Answer for title ${answer.title} has been succesfully updated`,
          answer: answer
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static voting (req, res) {
    Answer
      .findById(req.params.id)
      .then(answer => {      
        let answerUpvoteFirst = answer.upvotes.filter(upvote => upvote.toString() === req.userLogin._id.toString()).length
        let answerDownvoteFirst = answer.downvotes.filter(downvote => downvote.toString() === req.userLogin._id.toString()).length
        answer.upvotes = answer.upvotes.filter(upvote => upvote.toString() !== req.userLogin._id.toString())
        answer.downvotes = answer.downvotes.filter(upvote => upvote.toString() !== req.userLogin._id.toString())
        if(req.body.vote === 'upvote' && answerUpvoteFirst === 0) {
          answer.upvotes.push(req.userLogin._id)
        } else if (req.body.vote === 'downvote' &&  answerDownvoteFirst === 0) {
          answer.downvotes.push(req.userLogin._id)
        }
        return answer.save()
      })
      .then(answer => {
        res.status(200).json({
          message: 'Voting success',
          answer: answer
        })
      })
      .catch(error => {
        console.log(error)
        errorCatcher.default(error, req, res)
      })
  }

  static create (req, res) {
    Answer
      .create({
        title: req.body.title,
        description: req.body.description,
        questionId: req.body.questionId,
        userId: req.userLogin._id,
        upvotes: [],
        downvotes: []
      })
      .then(answer => {
        res.status(201).json({
          message: `Answer with title ${answer.title} has been successfully created`,
          answer: answer
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static remove (req, res) {
    Answer
      .findByIdAndDelete(req.params.id)
      .then(answer => {
        res.status(200).json({
          message: `Answer with title ${answer.title} has been successfully deleted`,
          answer: answer
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

}

module.exports = AnswerController
