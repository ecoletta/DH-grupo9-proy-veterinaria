var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/carrito/', function(req, res, next) {
  res.render('carrito', { title: 'Express' });
});

router.get('/carga/', function(req, res, next) {
  res.render('addproduct', { title: 'Express' });
});

router.get('/registro/', function(req, res, next) {
  res.render('registro', { title: 'Express' });
});

router.get('/detalle/', function(req, res, next) {
  res.render('detalle', { title: 'Express' });
});

module.exports = router;
