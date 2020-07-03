const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminMiddleware = require('../​middlewares​/adminMiddleware');

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
router.get('/', productController.root);  //DB CRUD OK

router.get('/search', productController.search);

// Formulario de creación de productos y acción de creación
router.get('/create/', adminMiddleware, productController.create);
router.post('/create/', adminMiddleware, upload.any(), productController.store);  //DB CRUD OK

// Detalle del producto en particular
router.get('/:id', productController.detail); //DB CRUD OK

// Formulario de edición de productos y acción de edición
router.get('/:id/edit', adminMiddleware, productController.edit); //DB CRUD OK
router.put('/:id', adminMiddleware, productController.update);  //DB CRUD OK

// Eliminar producto
router.delete('/:id', adminMiddleware, productController.destroy);



module.exports = router;