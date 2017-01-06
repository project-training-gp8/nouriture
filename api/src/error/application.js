var crypto = require('crypto');
//this is procedural is it worth to make return a promise instead ?
function errorIdGenerator(){
  const hash = crypto.createHash('base64');
  hash.update(Array.prototype.join.call(arguments, ''));
  return hash.digest('hex');
};
/**
Here is an example for the error object
{
  layer: "application", //Where it does happen
                        //application mean it is our responsability
                        //(as the RESTful API)
  status: "404",        //HTTP status code used in response
  message: "The user should know this"
  reason: "This is for debug purposes and should \
          not be exposed to the end user"
}

**/
function tError(status, message, reason, layer = "application"){
    this.layer = layer;//hardcoded for no good reason
    this.status = status;
    this.message = message;
    this.reason = reason;
    this.list = {
      dbError: "Database error, please try again later.",
      BadParam: "Bad parameter",
      userNotFound: "User not found",
      recipeNotFound: "Recipe not found",
      notFound: "Ressource not found"
      };
};
exports.tError = tError;
exports.applicationErrorHandler =
function(error, req, res, next){
  //console.log("running in the application error handler",error);
	if (error instanceof tError){
		res.generic = {};//TODO:Remove when implemented
		res.generic.err = {id:null, message: null};
    res.generic.err.message = error.message;
    if (error.reason){
      //This way we avoid useless load on the server
      //for the more trivial errors
      res.generic.err.id = errorIdGenerator(Date.now(), error.layer);
      //TODO:Use our journaling system to actually log the error.
      console.log({level: "error", id: res.generic.err.id, error: error});
    }
	}
	next(error);
}
exports.genericErrorHandler =
function(error, req, res, next){
  var statusCode = 500;
  if (error instanceof tError){
    statusCode = error.status;
  } else if(error instanceof String){
    res.generic.err = "This should never have happened : \"" + error + "\"";
  } else {
    res.generic.err = "Internal server error, please try again later.";
  }
  //TODO: Have more time to do things here
  //console.log("DEBUG MODE:", error);
  return res.status(statusCode).send(res.generic);
}
exports.handle = {};
exports.handle.database = function(error, req, res, next, result){
  if (error){
    return next(new tError(500, tError.dbError, error));
  } else if (!result){
    return next(new tError(404, tError.notFound, null));
  }
  else{
    return false;
  }
};
