var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

/* GET home page. */
router.get('/', productController.root);

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
