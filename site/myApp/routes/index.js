var express = require('express');
var router = express.Router();

// CONTROLADORES
const indexController = require('../controllers/indexController')

router.get('/', indexController.root);

router.get('/carrito/', function(req, res, next) {
  res.render('carrito', { title: 'Express' });
});

router.get('/detalle/', function(req, res, next) {
  res.render('detalle', { title: 'Express' });
});

module.exports = router;
