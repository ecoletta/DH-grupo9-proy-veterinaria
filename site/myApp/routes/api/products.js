var express = require('express');
var router = express.Router();

const productsAPIController = require('../../controllers/api/productController');

router.get('/', productsAPIController.root);
router.get('/opc', productsAPIController.opcional);
router.get('/:id', productsAPIController.detail);

module.exports = router;