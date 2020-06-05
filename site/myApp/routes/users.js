var express = require('express');
var router = express.Router();

// CONTROLADORES
const usersController = require('../controllers/usersController')

/* GET Registro usuarios /users/registro. */
router.get('/registro/', function(req, res, next) {
  res.render('registro');
});

/* GET usuarios /users */
router.get('/', usersController.root);

module.exports = router;
