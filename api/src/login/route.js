var route = require("express").Router();

route.get("/", function(req, res){
	
	res.send("email login shit");
});
route.get("/weixin", function(req, res){
	res.send("hopefully weixin login?");
})
route.get("/qq", function(req, res){
	if (req.get("auth") == "pretendtoekn")
		res.send("Poto");
	res.send("(m)++__++(W)");
});
module.exports = route;
