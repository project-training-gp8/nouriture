var route = require("express").Router();
var crypto = require('crypto');
var tError = require('../error/application').tError;

const StringDecoder = require('string_decoder').StringDecoder;
function amt(err, req, res, next){
	console.log("Not reaching this code ever..", err);
	if (err == "AuthenticationError")
	return res.status(403).send({
        success: false,
        message: 'Error motherfucker'
    });
}
route.post("/", function(req, res, next){
	var UserSchema = require("../models/user");
	//console.log(req.body);
	UserSchema.findOne({name: req.body.user}, function(err, result){
		//console.log(err,result);
		if (result == null) {
			return next("AuthenticationError");
		}
		if (result != null) {
			var token = {
				header: {alg: "HS256", typ: "JWT"},//hardcoded plz
				payload: {sub: result._id, name: result.name, email: result.email},
				sig: function(header, payload){
					var secret = process.env.JWT_SECRET_KEY | 'secret';
					var alg = crypto.createHmac('sha256', "secret");
					console.log(JSON.stringify(header), JSON.stringify(payload), payload, result);
					const hdr = Buffer.from(JSON.stringify(header));
					const pld = Buffer.from(JSON.stringify(payload));
					retval = hdr.toString('base64') + ".";
					retval += pld.toString('base64') + ".";
					retval +=
					alg.update(hdr.toString('base64'),'base64')//.digest("base64"));
					.update(".")
					.update(pld.toString('base64'),'base64').digest("base64");
					return retval;
			}};
			if (req.body.hashedpw == result.password)//not hashed right now
			{
				res.generic.data = {token: token.sig(token.header, token.payload)};
			}
			req.body.username;
			req.body.email;
			req.body.hashedpw;
		}
		else {console.log(err);}
		res.json(res.generic);
	});
});
var jwt = require("express-jwt-token");
route.get("/test", jwt.jwtAuthProtected, function(req, res){
	res.json({user: req.user});
});
route.get("/weixin", function(req, res){
	res.send("hopefully weixin login?");
});
route.get("/qq", function(req, res){
	if (req.get("auth") == "pretendtoekn")
		res.send("Poto");
	res.send("(m)++__++(W)");
});
module.exports = route;
