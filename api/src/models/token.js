var mongoose = require("mongoose");
module.exports = mongoose.model("token", new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  validity: Number,
  scope: String,
  text: String
})
);
