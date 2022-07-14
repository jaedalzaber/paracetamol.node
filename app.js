const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const awilix = require('awilix')

const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/usersRoutes');

// const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')

const config = require('./config/config');

const app = express();

const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.CLASSIC
});

mongoose.connect(config.mongoUrl)
	.then((db) => {
		console.log("Connected correctly to mongodb");
	})
	.catch((err) => {
		console.log(err);
	});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: config.secretKey
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
