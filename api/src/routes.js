var loginRoute = require("./login/route");
var userRoute = require("./user/route");
var recipeRoute = require("./recipe/route");

//Routes setup export func cause i'm lazy
module.exports = function(app){
  app.use("/api/login/", loginRoute);
  app.use("/api/user/", userRoute);
  app.use("/api/recipe", recipeRoute);
};
