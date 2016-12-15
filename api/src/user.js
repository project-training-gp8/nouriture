var route = require("express").Router();

//Get a recipe 
//Anon
route.get("/recipe/:id", function (req, res, next){
	req.params.id;
	//pretedn redis is here already ?
	req.cache.get("testkey", function(err, replies){
		if (err){
			console.log("TODO: do something when the cache is not hit, log it, query the database, etc", err);
			next();//TODO:real error handling
		}
		res.json({legit: "response", recipe: replies});
		//res.send("Redis Response:" + replies);
	});
	
};

route.get("/recipes/:user/:list", function(req, res, next){
});

route.get("/recipes/", function(req, res, next){
});
route.param("user", function(req, res, next, uid){
	var User = require('./models/user');
	User.findOne({name: uid}, function(err, userResult){
		if (err) next(err);//No user found or something
		req.userParam = userResult;
		next();
	});
});
route.get("/u"/*get own user if auth*/, function(req, res){
	//nope
	res.code(401);
	res.json({"success": false, "error": "unimplemented"});
});
/*noAuth, noChecks*/route.get("/u/:user"/*show 1 user*/, function(req, res){
	//put some privacy in there ?
	if (req.userParam == undefined){res.code = 418;
	res.json({"success": false, "error": "bad user"});}
	else
	res.json({"success":true, "user": req.userParam});
});
route.put("/u/:user"/*modify own user*/, function(req, res){res.json({success:"false", error: "uninplemented"});});
route.post("/u/new/:user"/*kittens and butterflies*/, function (req, res){

});
});
route.get("/s/u/:userpattern"/*list users (needs to change) */, function(req, res){});

/*
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){});
route.get("", function(req, res, next){}
*/
module.exports = route;
