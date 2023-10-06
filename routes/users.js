var express = require('express');
var router = express.Router();
const getUsers = require('../data/user.js')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log('usuarios');
  res.json(await getUsers());
});

module.exports = router;
