var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');                // Depenencia para gestionar cookies
var logger = require('morgan');
const methodOverride = require('method-override');          // Dependencia para gestionar métodos PUT/DELETE
const session = require('express-session');                 // Dependencia para gestionar sessiones
const userMiddleware = require('./​middlewares​/userMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var productsAPIRouter = require('./routes/api/products');    // PROBANDO API
var usersAPIRouter = require('./routes/api/users');
var cartRouter = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));                         // Gestionar métodos PUT/DELETE
app.use(session({
  secret: 'Mensaje super secreto',
  resave: false,
  saveUninitialized: true
}));

app.use(userMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/api/products', productsAPIRouter);                // PROBANDO API
app.use('/api/users', usersAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
