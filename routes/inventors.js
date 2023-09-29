var express = require('express');
var router = express.Router();


/* GET inventores listing. */
router.get('/', function(req, res, next) {
  res.json(inventors);
});

// GET /:id

//POST /   <- Alta de inventor

//PUT /:id <-- Actualizacion de inventor

//DELETE /:id <-- Borrado de un inventor

module.exports = router;