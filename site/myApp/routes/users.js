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

// Controlador
const usersController = require('../controllers/usersController')

// Registro usuarios
router.get('/registro/', usersController.register);
router.post('/registro/', upload.any(), usersController.store);

// Login de usuarios
router.get('/login/', usersController.login);
router.post('/login/', usersController.validate);

router.get('/logout/', usersController.logout);

module.exports = router;
