const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Para la carga de archivos con multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img_products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage });

// CONTROLADORES
const productController = require('../controllers/productController')

// Listado de productos
router.get('/', productController.root);

// Detalle del producto
router.get('/:id', productController.detail);

// Formulario de creación de productos
router.get('/create/', productController.create);
router.post('/create/', upload.any(), productController.store);

// Editar producto
router.get('/:id/edit', productController.edit);

// Eliminar producto
router.delete('/:id', productController.destroy);



module.exports = router;