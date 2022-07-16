
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');


const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/usersRoutes');

const userRouter = require('./api/collections/users/user.route');

// const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')
const awilix = require('awilix-express')

const config = require('./config/config');
const di = require('./di-setup');
const Test = require('./services/test.service');

const app = express();

const ROLE = require('./config/roles.js')

const container = di();
app.use(awilix.scopePerRequest(container));

console.log(eval("(require('./config/roles.js'))"));

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
app.use('/user', userRouter);
app.use('/users', usersRouter);

const router = express.Router();
const api = awilix.makeInvoker(Test)
router.get('/todos', api('print'));
app.use('/test', router);

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
