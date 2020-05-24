const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
	// Root - Show all products
	root: (req, res) => {
		res.render('index', {
			products: products
		});
    }};

module.exports = productController;
