const jwtConvert = require('../helpers/jwtConvert')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = {
  authenticate(req, res, next) {
    try {
      const user = jwtConvert.verify(req.headers.token)
      console.log(user)
      User
        .findOne({
          _id: user._id,
          name: user.name,
          email: user.email,
          loginVia: user.loginVia
        })
        .then(user => {
          if(user) {
            req.userLogin = user
            next()
          } else {
            res.status(400).json({
              message: 'Please Login First'
            })
          }
        })
    }
    catch (error) {
      console.log(error)
      res.status(400).json({
        message: 'Please Login First'
      })
    }
  },

  authorize(req, res, next) {
    Question
      .findById(req.params.id)
      .then(question => {
        if(question.userId.toString() === req.userLogin._id.toString()) {
          next();
        } else {
          res.status(401).json({
            message: 'Not authorized'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  authorizeAnswer(req, res, next) {
    Answer
      .findById(req.params.id)
      .then(answer => {
        if(answer.userId.toString() === req.userLogin._id.toString()) {
          next();
        } else {
          res.status(401).json({
            message: 'Not authorized'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}