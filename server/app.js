const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hacktivoverflow', {useNewUrlParser: true});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

module.exports = app;
