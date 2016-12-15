//var router = require("express").Router();
var loginRoute = require("./login/route");
//var userRoute = require("./users/route");
var recipeRoute = require("./recipes");

//var Route = require("/route");

//Routes setup
//router.use("login", loginRoute);
//router.use("user", userRoute);
//router.use("recipe", recipeRoute);
module.exports.recipe = recipeRoute;
//module.exports.user = userRoute;
module.exports.login = loginRoute;
