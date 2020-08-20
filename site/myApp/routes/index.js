var express = require('express');
var router = express.Router();

// CONTROLADORES
const indexController = require('../controllers/indexController')

router.get('/', indexController.root);


// // SECCIÓNES PARA HACER
// router.get('/cart/', function(req, res, next) {
//   res.render('carrito', { title: 'Express' });
// });

router.get('/services/', function(req, res, next) {
  res.render('under-construction');
});

router.get('/appointments/', function(req, res, next) {
  res.render('under-construction');
})

router.get('/shops/', function(req, res, next) {
  res.render('under-construction');
})

router.get('/contact/', function(req, res, next) {
  res.render('under-construction');
})


module.exports = router;
