const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products', {
			products: products
		});
	},
	// Create - Form to create
	create: (req, res) => {
		res.render('addproduct');
	},
	// Create -  Method to store
	store: (req, res) => {
		const newId = products.length + 1;
		const newProduct = {
			id: newId,
			name: req.body.name,
			category: req.body.category,
			stock: req.body.stock,
			price: req.body.price,
			discount: req.body.discount,
			description: req.body.description,
			// image: "https://picsum.photos/200/300?random=" + newId
			image: req.files[0].filename

		};
		const finalProduct = [...products, newProduct];
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProduct, null, ' '));
		res.redirect('/');
	},

	detail: (req, res) => {
		const productId = req.params.id;
		const product = products.find(p => p.id == productId);

		res.render('detalle', {
			product: product
		});
	},

	destroy: (req, res) => {
		const index = products.findIndex(p => p.id == req.params.id);
		const product = products.splice(index, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	edit: (req, res) => {
		const productId	= req.params.id;
		const product = products.find(p => p.id == productId);
		res.render('edit-product', {
			editProduct: product
		});
	},

	// Función para editar los productos
	update: (req, res) => {
		// Buscar la posición del producto dentro del array por la propiedad id
		const index = products.findIndex(p => p.id == req.params.id);

		// Editar las propiedades del producto
		products[index].name = req.body.name;
		products[index].category = req.body.category;
		products[index].stock = req.body.stock;
		products[index].price = req.body.price;
		products[index].discount = req.body.discount;
		products[index].description = req.body.description;

		// Guardar la información modificada en el archivo de productos
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		// Redireccionar la página al index
		res.redirect('/');
	}

};

module.exports = productController;
