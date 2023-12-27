var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./db');

var app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   //credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

var userRouter = require('./routes/userRoutes');
var productRouter = require('./routes/productRoutes');
var inventoryRouter = require('./routes/inventoryRoutes');
var supplierRouter = require('./routes/suppliersRoutes');
var internalOrdersRouter = require('./routes/internalOrdersRoutes');


//app.use(cors(corsOptions))

app.use(cors({origin: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', userRouter);
app.use('/api/', productRouter);
app.use('/api/', inventoryRouter);
app.use('/api/', supplierRouter);
app.use('/api/', internalOrdersRouter);

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
