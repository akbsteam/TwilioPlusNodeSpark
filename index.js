/**
* Module dependencies.
*/
var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, hjs = require('hjs');

var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.voteSMS);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});