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
	}
};

module.exports = productController;
