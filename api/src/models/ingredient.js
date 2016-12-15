var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var FoodStatsSchema = new Schema({name: String, value: Number});
var FoodStat = mongoose.model("FoodStats", FoodStatsSchema);
module.exports = mongoose.model("Ingredient", new Schema({
	name: String,
	user: Schema.Types.ObjectId,
	foodStats: [FoodStatsSchema],
	quantity: String
}));
