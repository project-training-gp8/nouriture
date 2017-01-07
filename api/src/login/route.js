var route = require("express").Router();
var crypto = require('crypto');
var tError = require('../error/application').tError;
//Pull dependency of a dependency it's a dangerous gane you're playing
var jws = require('../../node_modules/express-jwt-token/node_modules/jsonwebtokens/index');
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
	console.log(req.params, req.body);

	UserSchema.findOne({email: req.body.email}, function(err, result){
		//console.log(err,result);
		if (result == null) {
			return next(new tError(403, "AuthenticationError", null));
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
			if (req.body.password == result.pass){
				//res.generic.data = {token: token.sig(token.header, token.payload)};
				res.generic.data = {token: jws.sign(token.payload,process.env.JWT_SECRET_KEY || 'secret')};
			}
			else{
				return next(new tError(403, "Authentication Error", null));
			}
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
