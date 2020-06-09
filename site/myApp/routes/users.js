var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

// Para la carga de archivos con multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/img_users')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage });

// CONTROLADORES
const usersController = require('../controllers/usersController')

/* GET Registro usuarios /users/registro. */
router.get('/registro/', function(req, res, next) {
  res.render('registro');
});

/* POST Registro usuarios /users/registro. */
router.post('/registro/', upload.any(), usersController.store);

/* GET usuarios /users */
router.get('/', usersController.root);

module.exports = router;
