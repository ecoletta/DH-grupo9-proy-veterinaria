const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const indexController = {
	// Root - Show all products
	root: (req, res) => {

		//Esto es un chequeo para verificar si se crea correctamente un producto usando ORM (Salio OK!!!!)
		/*db.Productos.create({
			name: "comida gato 01",
			id_category: "2",
			stock: "10",
			price: "300",
			discount: "10",
			description: "Es un buen producto para gatos",
			image: "Aca iria la url de la imagen"
		  }); */

		db.Productos.findAll()
		db.Productos.findAll().then((productos) => {
			res.render('index', {
				products: productos,
				user: req.session.user
			});
		});

		// res.render('index', {
		// 	products: products,
		// 	user: req.session.user 
		// });
	}
};

module.exports = indexController;
