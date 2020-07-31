var express = require('express');
var router = express.Router();

const usersAPIController = require('../../controllers/api/userController');

router.get('/', usersAPIController.root);
router.get('/opc', usersAPIController.opcional);
router.get('/:id', usersAPIController.detail);

module.exports = router;