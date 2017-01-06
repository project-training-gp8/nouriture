API
======
generic object
{error: null, data: Array or Object}
{error: {id: "sha256/base64", message: "nice text message"}, data: null}

GET /api/recipe
  error
    500 (db error)
  return [{_id, name, user, desc, image}]

GET /api/recipe/:id/
  param recipe id(format:BSON.ObjectId)
  errors
      404(not found)
      500(db error)
      400(bad parameter)
  return {_id, name, user, desc, image}
GET /api/recipe/:id/(detailed)?
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

POST /api/login
  params (POST user, POST password)
