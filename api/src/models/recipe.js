var mongoose = require("mongoose");
//var IngredientSchema = require("ingredient");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Recipe", new Schema({
	name: String,
	user: Schema.Types.ObjectId,
	ingredients: [Schema.Types.ObjectId],//and so much more
	comments: [Schema.Types.ObjectId],
	text: String
}));
