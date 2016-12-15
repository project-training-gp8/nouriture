var route = require("express").Router();
var IngredientSchema = require("./models/ingredient");
var RecipeSchema = require("./models/recipe");

route.get("/", function(req, res){
	/*
	** Get the lastest user submited/favorited recipes
	**
	** Params: None
	** Return values:
	**	- 200 + No recipes: User has no recipes.
	**	- 200 : OK
	**	- 403 : need auth
	** TODO: plug authorization (we need an error sent back to an unauthenticated user)
	*/
	var err = {error: null, code: 200};
	var data = null;

	//Bullshit
	if (true){
	err.error= "unimplemented";
	err.status= 409;
	data= {exemple: "example"};}
	//end of bullshit

		res.status(err.code).json({err: err.error, data: data});
});

//Should params be imported from yet another sourcefile ?
route.param("user", function(req, res, next, uid){
	var User = require('./models/user');
	User.findOne({name: uid}, function(err, userResult){
		if (err) next(err);//No user found or something
		req.userParam = userResult;
		next();
	});
});

route.param("recipename", function(req, res, next, recipename){
	RecipeSchema.find({name: recipename},
		function(err, recipeResults){
			req.searchYield = {error: err, Yield: recipeResults};
			next();
	});
});

route.get("/s/:recipename", function(req, res){
	res.json({err: req.searchYield.err, results: req.searchYield.Yield});
});

module.exports = route;
