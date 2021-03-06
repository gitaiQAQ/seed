'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var i18n = require('i18n-2');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes');

var app = express();

// view engine setup
/*
var jade = require('jade');

app.engine('jade', function(fn, opt, cb){
    console.log(this,);
    jade.renderFile(fn,opt,function(err,str){
        if (err) {
            cb(err);
        };
        cb(null,str);
    });
});*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals = Configs.locals;

app.enable('trust proxy');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

i18n.expressBind(app, Configs.locales);

app.use(require('./libs/cache'));

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.format({
            text: function() {
                res.send(err.message);
            },
            html: function() {
                res.render('error', {
                    status:err.status,
                    message: err.message,
                    error: err
                });
            },
            json: function() {
                res.send(err);
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.format({
        text: function() {
            res.send(err.message);
        },
        html: function() {
            res.render('error', {
                status:err.status,
                message: err.message
            });
        },
        json: function() {
            res.send(err);
        }
    });
});


module.exports = app;
