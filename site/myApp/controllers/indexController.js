const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const indexController = {
	// Root - Show all products
	root: (req, res) => {
		res.render('index', {
			products: products,
			user: req.session.user 
		});
	}
};

module.exports = indexController;
