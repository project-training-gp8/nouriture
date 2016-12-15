//Ext Deps.
var express = require("express");
var perms = require("express-permissions");
var db = require("mongoose");
//Our shit.
var routes = require("./routes");
var authz = require("./authorization");
var test = require("./test");
var redis = require("redis");

var app = express();
/** debug stuff */
if (true){
	var morgan = require("morgan");
	app.use(morgan('dev'));
}
/** end of debug stuff */

//variables use package.json configuration for this
var port = 1024;//use package->config
var mongoUri = "mongodb://127.0.0.1/test";
//Configuration
//db.connect(mongoUri);
//console.log("some more interesting connection reuse is going on and i don't know about it.");
app.redisCache = redis.createClient();
app.dbMongo = db.connect(mongoUri);

//Setup middleware
app.use("/", function(res, req, next){
	req.cache = app.redisCache;
	req.db = app.dbMongo;
	//console.log("why do you remind me of the documentation i did not read properly ?");
	next();
});

//routing
//app.use("/", routes.root);
routes(app);
//app.use("/api/login/", routes.login);
//app.use("/api/user/", routes.user);
//app.use("/api/recipe/", routes.recipe);
//app.use("/api/search/", routes.shit);
app.use("/", test);
//Authorization
app.premissionDenied = function(res, req){
	// Look for some more information for the user ?
	// and put it in req.locals ???
	var localShit = { succes: false, error: "permission denied" };
	res.status(403);
	res.json(localShit);
};
perms.add(app,"/",true);
/*perms.add(app,"/login/qq", function(res, req, resolve, reject){
	//pretend some check append in a promise
	resolve(req.get("auth") == "pretendtoekn");
}, true);*///Fun while it lasted :)
//app.use(perms);
//app.use.(authz);
//
//Let's start working
app.listen(port, function(){
	console.log("server started on " + port + ".");
});
