var express = require('express');
var router = express.Router();
const dataUser = require('../data/user.js');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log('usuarios');
  res.json(await dataUser.getUsers());
});

router.post('/login', async (req, res) => {
  try {
    const user = await dataUser.findByCredentials(req.body.email, req.body.password);
    const token = await dataUser.generateAuthToken(user);
    res.send({token});
  } catch (error) {
    res.status(401).send("Autenticación fallida");
  }
});

router.post('/register', async(req, res) => {
  try {
    const newUser = req.body;
    const result = await dataUser.addUser(newUser);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
