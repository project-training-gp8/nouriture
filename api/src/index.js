//Ext Deps.
var express = require("express");
var perms = require("express-permissions");
var db = require("mongoose");
var bodyParser  = require('body-parser');
//var jwt = require("express-jwt-token");
//Our shit.
var routes = require("./routes");
var authz = require("./authorization");
var test = require("./test");
var redis = require("redis");
var error = require("./error/application");
var app = express();

/* Debugging and log facilities
** use some configuration switch to toggle
** production			/ development logging
** files/journal	/	console
*/
if (true){//TODO: use configuration switch (from package.json/commandline config switches)
	var morgan = require("morgan");
	app.use(morgan('dev'));
}
/** end of debug stuff */
//Coucou
//variables use package.json configuration for this
var db_host = process.env.NOURRITURE_DB_HOST || "localhost";
var redis_host = process.env.NOURRITURE_REDIS_HOST || "localhost";
var port = process.env.NOURRITURE_PORT || 8090;//use package->config

var mongoUri = "mongodb://"+db_host+"/nourriture";
//Configuration

app.redisCache = redis.createClient({host: redis_host});
app.dbMongo = db.connect(mongoUri);
app.disable('x-powered-by');
app.disable('date');
app.disable('etag');

/* Setup middleware
** install database connections
** it's run once and reuse database connections
*/
app.use("/", function(req, res, next){
	req.cache = app.redisCache;
	req.db = app.dbMongo;
	res.generic = {err: null, data: null};

	next();
});
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routing
routes(app);//External defined routes
app.use("/", test);

//Authentication
//process.env.JWT_SECRET_KEY = 'bad ass secret';
//process.env.jwtAuthHeaderPrefix = 'JWT'; //stay with default 'JWT'

//Authorization TODO: plug the token modules here
app.premissionDenied = function(res, req, next, err){
	// Look for some more information for the user ?
	// and put it in req.locals ???
	var localShit = { succes: false, error: "permission denied" };
	res.status(403);
	res.json(localShit);
	next(err);
};
perms.add(app,"/",true);
/*perms.add(app,"/login/qq", function(res, req, resolve, reject){
	//pretend some check append in a promise
	resolve(req.get("auth") == "pretendtoekn");
}, true);*///Fun while it lasted :)
//app.use(perms);
//app.use.(authz);
/***
**Error handling section
**TODO: move in it's onw file
***/

app.use(error.applicationErrorHandler);
//app.use(function unamedErrorHandler(error, req, res, next){});
app.use(error.genericErrorHandler);

//Server startup
app.listen(port, function(){
	console.log("server started on " + port + ".");
});
