const Question = require('../models/question');
const errorCatcher = require('../helpers/errorCatcher');
const tagCreator = require('../helpers/tagCreator');

class QuestionController {

  static read (req, res) {
    Question
      .find({})
      .populate('tags')
      .then(questions => {
        res.status(200).json({
          questions: questions
        })
      })
      .catch(error => {
        console.log(error)
        errorCatcher.default(error, req, res)
      })
  }

  static readOne (req, res) {
    Question
      .findById(req.params.id)
      .populate('tags')
      .then(question => {
        res.status(200).json({
          question: question
        })
      })
      .catch(error => {
        console.log(error)
        errorCatcher.default(error, req, res)
      })
  }

  static update (req, res) {
    tagCreator(req.body.tags)
      .then(tags => {
        return Question
          .findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            tags: tags
          }, { new: true })
      })
      .then(question => {
        res.status(200).json({
          message: `Successfully edit question with title ${question.title}`,
          question: question
        })
      })
      .catch(error => {
        console.log(error)
        errorCatcher.default(error, req, res)
      })
  }

  static remove (req, res) {
    Question
      .findByIdAndDelete(req.params.id)
      .then(question => {
        res.status(200).json({
          message: `Question with title ${question.title} successfully deleted`,
          question: question
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static create (req, res) {
    tagCreator(req.body.tags)
      .then(tags => {
        return Question
          .create({
            title: req.body.title,
            tags: tags,
            description: req.body.description,
            userId: req.userLogin._id,
            upvotes: [],
            downvotes: []
          })
      })
      .then(question => {
        res.status(201).json({
          message: `Question with title ${question.title} successfully created`,
          question: question
        })
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static voting (req, res) {
    Question
      .findById(req.params.id)
      .populate('tags')
      .then(question => {      
        let questionUpvoteFirst = question.upvotes.filter(upvote => upvote.toString() === req.userLogin._id.toString()).length
        let questionDownvoteFirst = question.downvotes.filter(downvote => downvote.toString() === req.userLogin._id.toString()).length
        question.upvotes = question.upvotes.filter(upvote => upvote.toString() !== req.userLogin._id.toString())
        question.downvotes = question.downvotes.filter(upvote => upvote.toString() !== req.userLogin._id.toString())
        if(req.body.vote === 'upvote' && questionUpvoteFirst === 0) {
          question.upvotes.push(req.userLogin._id)
        } else if (req.body.vote === 'downvote' &&  questionDownvoteFirst === 0) {
          question.downvotes.push(req.userLogin._id)
        }
        return question.save()
      })
      .then(question => {
        res.status(200).json({
          message: 'Voting success',
          question: question
        })
      })
      .catch(error => {
        console.log(error)
        errorCatcher.default(error, req, res)
      })
  }

}

module.exports = QuestionController