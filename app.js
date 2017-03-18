var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var fs              = require('fs');
// Load Highcharts
var Highcharts      = require('highcharts');

var routes = require('./routes/index');
var config  = require('./config/config');
console.log(JSON.stringify(config));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/'));
app.use('/highcharts', express.static(__dirname + '/node_modules/highcharts/'));

//routes
app.use('/', routes);

//global var
app.locals.pagetitle = "LIST";

//COUCHBASE
var debug = require('debug')('Couchbase Session Store');
var CouchbaseStore = require('connect-couchbase')(session);

var couchbaseStore = new CouchbaseStore({
    bucket: "moviesbucket",
    password: "",
    host: "",
    connectionTimeout: 50000,
    operationTimeout: 25000,
    cachefile: "",
    ttl: 86400,
    prefix: "sess"
});

couchbaseStore.on('connect', function() {
    debug("Couchbase Session store is ready for use");
    console.log("Couchbase Session store is ready for use...");
});

couchbaseStore.on('disconnect', function() {
    debug("An error occurred connecting to Couchbase Session Storage");
});

//Loading APIs.
console.log("Loading APIs...");
var apis = {};
var apis_path = __dirname + '/api';

fs.readdirSync(apis_path).forEach(function (fileName) {
    stats = fs.lstatSync(apis_path + '/' + fileName);
    if (stats.isDirectory()) {
        fs.readdirSync(apis_path + '/' + fileName).forEach(function (file) {
            if (file.indexOf('.js') != -1) {
                apis['/api/'+ fileName +'/' +file.split('.')[0]] = require(apis_path + '/'  + fileName + '/' + file);
            }
        });
    }
});

for(var i in apis)
{
    app.use(i,apis[i]);
    console.log("loading Api ", i);
}


/// catch 404 and forwarding to error handler
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
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function(){
    console.log("app listening on port 3000...");
});

module.exports = app;
