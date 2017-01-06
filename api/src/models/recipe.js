var mongoose = require("mongoose");
//var ObjectId = require('mongoose').Types.ObjectId;
//var IngredientSchema = require("ingredient");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Recipe", new Schema({
	name: String,
	user: Schema.Types.ObjectId,
	ingredients: [Schema.Types.ObjectId],//and so much more
	comments: [Schema.Types.ObjectId],
	directions: [{image:String, title: String, text: String}],
	favorites: {
		number: Number,
		schema: Schema.Types.ObjectId
	},
	desc: String,
	image: {
		small: String,
		large: String
	}
}));
