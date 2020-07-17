const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Sequelize } = require('../database/models');
const { validationResult } = require('express-validator');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
	// Root - Show all products
	root: (req, res) => {

		db.Productos.findAll().then((productos) => {
			res.render('products', {
				products: productos,
				user: req.session.user
			});
		});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('addproduct', {
			user: req.session.user
		});
	},

	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req);
		console.log(errors);
		//console.log(req.body);
		if (!errors.isEmpty()){
			//Procesar los errores para enviar a la vista
			return res.render('addproduct',{errors: errors.errors});
		}
		const newProduct = {
			name: req.body.name,
			id_category: req.body.category,
			stock: req.body.stock,
			price: req.body.price,
			discount: req.body.discount,
			description: req.body.description,
			image: req.files[0].filename
		};

		db.Productos.create(newProduct).then(() => {
			res.redirect('/');
		})
	},

	// Función para mostrar el detalle de un producto
	detail: (req, res) => {

		const productId = req.params.id;

		db.Productos.findByPk(productId, {
			include: [{association: 'categorias'}]
		}).then((producto) => {
			res.render('detalle', {
				product: producto,
				user: req.session.user,
				category: req.session.category
			});
		});
	},

	// Función para eliminar un producto
	destroy: (req, res) => {

		db.Productos.destroy({
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.redirect('/');
		});
	},

	// Función para editar los productos
	edit: (req, res) => {

		const productId	= req.params.id;

		db.Productos.findByPk(productId, {
			include: [{association: 'categorias'}]
		}).then((producto) => {
			console.log(producto);
			res.render('edit-product', {
				editProduct: producto,
				user: req.session.user
			});
		});
	},

	// Función para actualizar un producto
	update: (req, res) => {

		let errors = validationResult(req);
		
		if (!errors.isEmpty()){
			//Procesar los errores para enviar a la vista
			return res.render('edit-product',{errors: errors.errors});
		}

		const editProduct = {
			name: req.body.name,
			id_category: req.body.category,
			stock: req.body.stock,
			price: req.body.price,
			discount: req.body.discount,
			description: req.body.description,
			//image: req.files[0].filename				habría que agregar la opción de cambiar la imagen
		}

		db.Productos.update(editProduct, {
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.redirect('/');
		});
	},

	search: (req, res) => {

		db.Productos.findAll({
			where: {name: {[Sequelize.Op.like]: '%' + req.query.query + '%' } }
		}).then((productos) => {
			res.render('search', {
				products: productos,
				user: req.session.user
			});
		});
	}
};

module.exports = productController;
