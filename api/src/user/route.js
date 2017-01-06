var route = require("express").Router();
var tError = require("../error/application").tError;
var handler = require("../error/application").handle;
var User = require('../models/user');

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

});

route.get("/recipes/:user?/:list", function(req, res, next){
	var RecipeSchema = require("../models/recipe");
	//other user recipes
	var user = "dont judge me ok?";
	user = (req.params('user')) ? req.params.user : req.auth.user;
	var query = RecipeSchema.find({user: user});
	query.select({_id: 1, name: 1, desc: 1, image: 1});
	if (req.params.list != 'all'){
		query.where({list: new RegExp("/"+req.params.list+"/")});
	}
	query.exec(function(err, resultsArray){
		if (!handler.database(err, req, res, next, result)){
			res.generic.data = resultsArray;
			res.send(res.generic);
		}
		//never reached
		next(new tError(500, "Internal server error", "Unreachable code reached in /user/route.js"));
	});
});

route.get("/recipes/", function(req, res, next){
	//our user recipes plz mount shit from recipes
});

route.param("user", function(req, res, next, userId){
	User.findOne({name: uid}, function(err, userResult){
		if (err) next(err);//No user found or something
		req.userParam = userResult;
		next();
	});
});

route.get("/u/:user"/*show 1 user*/, function(req, res){
	//put some privacy in there ?
	if (req.userParam == undefined){ res.code = 418;
	res.json({"success": false, "error": "bad user"});}
	else
	res.json({"success":true, "user": req.userParam});
});

route.put("/u/:user"/*modify own user*/,
	function(req, res){
		var query = User.find({});
		res.send(res.generic);
	});

route.post("/new/"/*kittens and butterflies*/,
	function (req, res, next){

});
route.get("/s/u/:userpattern"/*list users (needs to change) */, function(req, res){});

module.exports = route;
