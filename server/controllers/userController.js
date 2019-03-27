const User = require('../models/user');
const hashPassword = require('../helpers/hashPassword');
const jwtConvert = require('../helpers/jwtConvert');
const errorCatcher = require('../helpers/errorCatcher');

class UserController {

  static login (req, res) {
    User
      .findOne({
        email: req.body.email,
        password: hashPassword(req.body.password),
        loginVia: req.body.loginVia
      })
      .then(user => {
        console.log(user)
        if(user) {
          let userLogin = {
            _id: user._id,
            name: user.name,
            email: user.email,
            loginVia: user.loginVia,
            watchTag: user.watchTag
          }
          let token = jwtConvert.sign(userLogin)
          res.status(200).json({
            message: `Welcome ${user.name}`,
            token: token,
            userLogin: userLogin
          })
        } else {
          res.status(400).json({
            message: 'Invalid username/password'
          })
        }
      })
      .catch(error => {
        errorCatcher.default(error, req, res)
      })
  }

  static register (req, res) { 
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        loginVia: req.body.loginVia,
        watchTag: []
      })
      .then(user => {
        res.status(201).json({
          message: `Successfully register user with email ${user.email}`
        })
      })
      .catch(error => {
        errorCatcher.de.defaultfault(error, req, res)
      })
  }

  static verify (req, res) {
    res.status(200).json({
      message: `Welcome back ${req.userLogin.name}`,
      userLogin: req.userLogin
    })
  }

  static watchTags (req, res) {
    User
      .findById(req.userLogin._id)
      .then(user => {
        console.log(user.watchTag, req.body)
        if(req.body.status === 'unwatch') {
          if(!user.watchTag) {
            res.status(400).json({
              message: `You haven't watch this watch tag`
            })
          } else if (user.watchTag.includes(req.body.watchTag.toLowerCase())) {
            user.watchTag.splice(user.watchTag.indexOf(req.body.watchTag.toLowerCase()), 1)
            user.save()
              .then(user => {
                res.status(200).json({
                  message: `Successfully ${req.body.status} ${req.body.watchTag}`,
                  userLogin: user
                })
              })
          } else {
            res.status(400).json({
              message: `You haven't watch this watch tag`
            })
          }
        } else {
          console.log('test')
          if(!user.watchTag) {
            console.log(req.body.watchTag.toLowerCase(), user.watchTag)
            user.watchTag.push(req.body.watchTag.toLowerCase())
            user.save()
              .then(user => {
                res.status(200).json({
                  message: `Successfully ${req.body.status} ${req.body.watchTag}`,
                  userLogin: user
                })
              })
              .catch(error => {
                console.log(error)
              })
          } else if (!user.watchTag.includes(req.body.watchTag.toLowerCase())) {
            user.watchTag.push(req.body.watchTag.toLowerCase())
            user.save()
              .then(user => {
                res.status(200).json({
                  message: `Successfully ${req.body.status} ${req.body.watchTag}`,
                  userLogin: user
                })
              })
          } else {
            res.status(400).json({
              message: `This tag already on your watch tag`
            })
          }
        }
      })
      .catch(error => {
        console.log(error)
        errorCatcher.de.defaultfault(error, req, res)
      })
  }

}

module.exports = UserController