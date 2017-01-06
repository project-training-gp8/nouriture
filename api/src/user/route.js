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
	var query = User.findOne({name: userId});
  query.select({name:1, email:1, avatar:1});
  query.exec(function(err, userResult){
		if (err) next(err);//No user found or something
		req.userParam = userResult;
		next();
	});
});

route.get("/u/:user"/*show 1 user*/, function(req, res, next){
	//put some privacy in there ?
	if (req.userParam == undefined){ res.code = 418;
	res.json({"success": false, "error": "bad user"});}
	else
	res.json({"success":true, "user": req.userParam});
});

route.put("/"/*modify own user*/,
	function(req, res, next){
		//var query = User.find({_id: req.locals.userId});
    var query = req.findByIdAndUpdate(id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar
      }
    }, { new: true }, function (err, req) {
  if (err) return next(err);
});
		res.send(res.generic);
	});
/*Create a new user AKA register*/
route.post("/"/*kittens and butterflies*/,
	function (req, res, next){
		//console.log("Requested user account", req.body);
		if (req.body.password && req.body.email){
			var query = User.findOne({email: req.params.email});
			query.exec(function(err, result){
				//console.log("user found? ", err, result);
				if (!err){
					var innerQuery = new User({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						name: req.body.firstName + req.body.lastName,
						email: req.body.email,
						pass: req.body.password,
						avatar: req.body.image
					});
					if (result){return next(new tError(409, "User already exists", null));}
					innerQuery.save(function(err){
						//console.log("are we going to cry?", err);
						if (err){
							return next(new tError(500, "Database Error", err));}
						else{
							//console.log("last stage of user register it works good job!");
							return res.send(res.generic);
						}
					});
				}
				else{
					return next(new tError(500, "Database error", null));}
			});
		}
		else{
		return next(new tError(400, "Missing parameter X", null));}
});
route.get("/s/u/:userpattern"/*list users (needs to change) */, function(req, res){});

module.exports = route;
