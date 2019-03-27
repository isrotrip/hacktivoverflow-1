const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/hashPassword');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill the name field']
  },
  email: {
    type: String,
    required: true,
    validate: [{
      validator(value) {
        return User
          .findOne({
            email: value
          })
          .then(user => {
            if(user) {
              if(user._id.toString() === this._id.toString()) {
                return true
              } else {
                return false
              }
            }
            return true
          })
          .catch(error => {
            return false
          })
      }, message: 'Email has been taken'
    }]
  },
  password: {
    type: String,
    minlength: [5, 'Minimum length is 5']
  },
  loginVia: {
    type: String,
    required: [true, 'Login via field should be fill']
  },
  watchTag: [{
    type: String
  }]
})

userSchema.pre('save', function(next) {
  if(!this.password || this.password.length < 5 || this.password.length > 10) {
    next()
  } else {
    this.password = hashPassword(this.password)
    next()
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User