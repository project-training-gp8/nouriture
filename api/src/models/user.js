var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
	name: String,
	email: String,
	pass: String//and so much more
}));
