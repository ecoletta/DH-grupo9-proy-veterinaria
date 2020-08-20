var express = require('express');
var router = express.Router();

// // CONTROLADORES
const cartController = require('../controllers/cartController')

// router.get('/', indexController.root);


router.get('/', cartController.root);
router.post('/pay', cartController.pay);


module.exports = router;
