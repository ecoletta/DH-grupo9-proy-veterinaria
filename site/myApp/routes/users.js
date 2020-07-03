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

// CONTROLADOR
const usersController = require('../controllers/usersController')

// REGISTRO DE USUARIOS
router.get('/registro/', usersController.register);
router.post('/registro/', upload.any(), usersController.store);

// LOGIN DE USUARIOS
router.get('/login/', usersController.login);
router.post('/login/', usersController.validate);

// LOGOUT DE USUARIOS
router.get('/logout/', usersController.logout);

// PROFILE DE USUARIOS // DEBERÍA TENER UN MIDDLEWARED
router.get('/profile/', usersController.profile);
router.get('/profile/edit/', usersController.edit);
router.put('/profile/edit/', upload.any(), usersController.update);

module.exports = router;
