const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

//Extensiones permitidas para archivos de imagenes
const extensionesImagen = [".JPG",".jpg",".JPEG",".jpeg",".png",".PNG",".gif",".GIF"]

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
const usersController = require('../controllers/usersController');
const { truncate } = require('fs');

// REGISTRO DE USUARIOS
router.get('/registro/', usersController.register);
router.post('/registro/', upload.any(),[
  check('name').isLength({min: 2}).withMessage('Debe ingresar al menos 2 caracteres para nombre'),
  check('apellido').isLength({min: 2}).withMessage('Debe ingresar al menos 2 caracteres para apellido'),
  check('password').isLength({min: 8}).withMessage('Debe ingresar al menos 8 caracteres para password'),
  check('email').isEmail(),
  check('email').custom((value,{req}) => {
      if(db.Usuarios.findOne({where: {email: req.body.email}}).then((valor) => {console.log(valor)}) == null){
        return true;
      } else {
        return false;
        }
  }).withMessage('El usuario ya se encuentra registrado'),
  check('imgUser').custom((value,{req})=> {
    for(extension of extensionesImagen){
      if(path.extname(req.files[0].filename) == extension){
        return true;
      }
    }
  }).withMessage('La extension de la imagen debe ser jpg, jpeg, png o gif')], usersController.store);

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
