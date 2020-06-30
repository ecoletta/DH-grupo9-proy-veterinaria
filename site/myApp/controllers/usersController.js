const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

	login: (req, res) => {
		res.render('login', {
			user: undefined
		});
	},

	validate: (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		// 1. Buscar usuario por email
		user = users.find(user => user.email == email);

		if(!user){
			res.render('login', {
				error: 'El usuario no se encuentra registrado',
				user: undefined
			});
		}

		// 2 Validar la contraseña
		if(!bcrypt.compareSync(password, user.password)){
			res.render('login', {
				error: 'La contraseña es inválida',
				user: undefined
			});
		}

		// 3 Guardar la sesión
		req.session.user = email;
		req.session.category = user.category;

		// 4 Generar cookie si se puso recordar
		if(req.body.remember == 'true'){
			res.cookie('user', email, {maxAge: 60*60*1000});
		}

		// 5 Redirigir el sitio al inicio
		res.redirect('/');

	},

	logout: (req, res) => {
		// Cerrar la sesión
		req.session.user = undefined;
		req.session.category = undefined;
		res.cookie('user', '', {maxAge: 0});
		res.redirect('/');
	},

	register: (req, res) => {
		res.render('registro');
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
			category: 'user',
			//image: "https://picsum.photos/200/300?random=" + newId
			image: req.files[0].filename
		};
		const finalUser = [...users, newUser];
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUser, null, ' '));
		res.redirect('/users/login/');
	}
};

module.exports = usersController;