var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

/* GET home page. */
router.get('/', productController.root);

router.get('/carrito/', function(req, res, next) {
  res.render('carrito', { title: 'Express' });
});

/*GET formulario agregar producto */
router.get('/addproduct/', productController.create);

/*POST agregar producto */
router.post('/addproduct/create', productController.store);

router.get('/registro/', function(req, res, next) {
  res.render('registro', { title: 'Express' });
});

router.get('/detalle/', function(req, res, next) {
  res.render('detalle', { title: 'Express' });
});

module.exports = router;
