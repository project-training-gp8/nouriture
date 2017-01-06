API
======
generic object
{error: null, data: Array or Object}
{error: {id: "sha256/base64", message: "nice text message"}, data: null}

Recipe
========
GET /api/recipe/home/:offset?
  error
    500 (db error)
    404 not found(no more results)
  return [{_id, name, user, desc, image, id}]

GET /api/recipe/id/:id/
  param recipe id(format:BSON.ObjectId)
  errors
      404(not found)
      500(db error)
      400(bad parameter)
  return {_id, name, user, desc, image}

GET /api/recipe/id/:id/(detailed)?
  param recipe id(format:BSON.ObjectId)
  errors
      404(not found)
      500(db error)
      400(bad parameter)
  return {_id, name, user, desc, image, directions([{title, text, image}]), comments([ObjectId]), favorites(???)}

POST /api/recipe/
  params (POST name, ect...)

PUT /api/recipe/:id
  params recipe id ()

User
======
POST /api/user (Create new user)
  params (POST email, POST pass, POST name)
  errors
    401 ??
    400 Bad Request(Bad/missing parameter)
    409 Conflict(User with that email exists)
    500 db error
  return null, with 200 status code

GET /api/user/:id
    params id userid if missing and Authentication token is
      provided will fetch current user profile.
    errors
      404
      401 Private information(not implemented)
      500db_error
    return {name: XX}

Login
======
POST /api/login
  params (POST user, POST password)
