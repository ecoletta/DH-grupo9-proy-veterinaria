const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersController = {
	// Root - Show all products
	root: (req, res) => {
		res.render('users', {
			products: products
        });
	},
	store: (req,res) => {
		console.log(req.body);
		const newId = users.length + 1;
		const newUser = {
			id: newId,
			first_name: req.body.name,
			last_name: req.body.apellido,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			//Recordar que el req.body tambien trae "repetir-contraseña" para una futura validacion
			category: req.body.category,
			//image: "https://picsum.photos/200/300?random=" + newId
			image: req.files[0].filename
		};
		const finalUser = [...users, newUser];
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUser, null, ' '));
		res.redirect('/');
	}
};

module.exports = usersController;