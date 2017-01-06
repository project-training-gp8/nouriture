var IngredientSchema = require("../models/ingredient");
var RecipeSchema = require("../models/recipe");

function searchRecipeName(recipename, searchcb){
  RecipeSchema.find({name: recipename},
		function(err, recipeResults){
			searchcb({error: err, Yield: recipeResults});
	});
}
function searchRecipeByUser(userid, searchcb){
  RecipeSchema.find({user: userid},
		function(err, recipeResults){
			searchcb({error: err, Yield: recipeResults});
	});
}
function searchPopularRecipes(searchcb){
  //Need a document/schema modeling the popularity of a recipe ?
  //maybe just a/some fields in `RecipeSchema` such as "favorites" or "likes"
  RecipeSchema.sort('favorites.number').limit(10).exec(searchcb);
}
module.export = {
  searchByUser: searchRecipeByUser,
  searchByRecipeName: searchRecipeName,
  popularRecipes: searchPopularRecipes
};
