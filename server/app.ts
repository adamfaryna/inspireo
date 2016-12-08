import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
// import favicon = require('serve-favicon');
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { apiRouter } from './routes/api.route';

const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// view engine setup
app.set('views', path.join(__dirname, 'build_server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

if (isDevelopment()) {
  app.use('/', express.static(path.join(__dirname, 'build_client')));

} else {
  app.use('/', express.static(path.join(__dirname, 'dist_client')));
}

app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
