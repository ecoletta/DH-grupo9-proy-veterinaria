const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersController = {
	// Root - Show all products
	root: (req, res) => {
		res.render('users', {
			products: products
        });
    }
};

module.exports = usersController;