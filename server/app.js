const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require("helmet");
const cors = require('cors')
require('dotenv').config();

const apiRouter = require('./routes/api');

const mongoose = require('./middlewares/mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoose());
app.use(cors())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(`${__dirname  }../../client/build`)));
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname  }../../client/build/index.html`));
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
