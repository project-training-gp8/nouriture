var route = require("express").Router();

route.get("/test", function(req, res, next){
	//var key = req.get("key");
	req.cache.get("testkey", function(err, replies){
		//lolz
		//console.log("test -> redis get", err, replies);
		res.send("Redis Response:" + replies);
	});
	});
//route.params("key", "nokey");
route.post("/test/:key", function(req, res, next){
	//var key = req.get("key");
	//console.log("Not even getting there...");

	//var key = req.params("key", "empty_key");
	var key = req.params.key;
	var mprop = req.myPropi || "CACA";
	if (key === "empty_key" && key == "empty_key") {console.log("Stupid");
	res.json({"error": "bad param shit"});}
	req.cache.set("testkey", key, function(err, replies){
		res.json({ "error": err, "response": replies, "value": key, "myprop": req.myProp });//"Server Says: " + replies
	});
});
route.param("key", function(req, res, next, id){
	//console.log("stupid key matching function with key=\"" + id + "\"");
	req.cache.get("key", function(err, replies){
		//id
		if (err) next(err);
		req.myProp = replies;
		next();
	});
});
route.param("user", function(req, res, next, uid){
	var User = require('./models/user');
	User.findOne({name: uid}, function(err, userResult){
		if (err) next(err);//No user found or something
		req.userReq = uid;
		req.userParam = userResult;
		next();
	});
});
route.get("/u"/*get own user if auth*/, function(req, res){
	//nope
	res.code = 401;
	res.json({"success": false, "error": "unimplemented"});/*implement plz*/
});
/*noAuth, noChecks*/route.get("/u/:user"/*show 1 user*/, function(req, res){
	//put some privacy in there ?
	if (req.userParam == undefined){res.code = 418;
	res.json({"success": false, "error": "bad user"});}
	else
	res.json({"success": true, "user": req.userParam});
});
route.put("/u/:user"/*modify own user*/, function(req, res){res.json({success:"false", error: "uninplemented"});});

/*Search is ok do paging*/
route.get("/u/new/:user"/*kittens and butterflies change verb to post*/, function (req, res){
	var User = require('./models/user');

	if (req.userParam == undefined){
		var nu = new User({
			name: req.userReq,
			pass: "password",
			email: req.userReq + "@qq.com"
		});
		nu.save(function(err){
			if (err) res.status(500).json({success: false, error: "Temporary error plz retry later."});
			else res.status(200).json({success: true});
		});
	}
	else
		res.status(418).json({success: false, error: "this is a tea pot."});
});
route.get("/u/search/:user"/*list users (needs to change) */, function(req, res){
	var User = require("./models/user");
	User.find({name: new RegExp(req.userReq)} ,function(err, userResults){
		if (err) res.status(500).json({success: false, error: "Temporary error plz.. etc"});
		else res.status(200).json({success: true, users: userResults});/*yeah wuth passwords and all db crap*/
	});
	//req.userReq
});

module.exports = route;
