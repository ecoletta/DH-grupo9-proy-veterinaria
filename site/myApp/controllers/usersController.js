const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const { CONNREFUSED } = require('dns');

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
		db.Usuarios.findOne({
			where: {
				email: email
			}
		}).then((user) => {
		
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
			req.session.user_id = user.id;
			req.session.category = user.category;

			// 4 Generar cookie si se puso recordar
			if(req.body.remember == 'true'){
				res.cookie('user', email, {maxAge: 60*60*1000});
			}

			// 5 Redirigir el sitio al inicio
			res.redirect('/');

		});

	},

	logout: (req, res) => {
		// Cerrar la sesión
		req.session.user = undefined;
		req.session.category = undefined;
		req.session.user_id = undefined;
		res.cookie('user', '', {maxAge: 0});
		res.redirect('/');
	},

	register: (req, res) => {
		res.render('registro');
	},

	store: (req,res) => {

		const newUser = {
			first_name: req.body.name,
			last_name: req.body.apellido,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			category: 'user',
			image: req.files[0].filename
		};

		db.Usuarios.create(newUser).then(() => {
			res.redirect('/users/login/');
		});
	},

	profile: (req, res) => {

		if(req.session.user_id != undefined){ // ESTO DEBE SER UN MIDDLEWARE
			db.Usuarios.findOne({
				where: {
					email: req.session.user
				}
			}).then((user) => {
				res.render('profile', {
					user: req.session.user,
					profile: user
				});
			});
		}
	},

	edit: (req, res) => {

		if(req.session.user_id != undefined){ // ESTO DEBE SER UN MIDDLEWARE
			db.Usuarios.findOne({
				where: {
					email: req.session.user
				}
			}).then((user) => {
				res.render('edit-profile', {
					user: req.session.user,
					profile: user
				});
			});
		}
	},

	update: (req, res) => {

		if(req.session.user_id != undefined){ // ESTO DEBE SER UN MIDDLEWARE

			let editUser = null;

			console.log('FILES: ' + req.files);

			if(!req.files[0]){
				editUser = {
					first_name: req.body.first_name,
					last_name: req.body.last_name
				}
			} else{
				editUser = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					image: req.files[0].filename
				}
			}

			db.Usuarios.findOne({
				where: {
					email: req.session.user
				}
			}).then((user) => {
				console.log('BORRAR ARCHIVO DE IMAGEN DE PERFIL ANTERIOR'); // CONTINUAR CON EL CÓDIGO ACÁ
			});

			db.Usuarios.update(editUser, {
				where: {
					email: req.session.user
				}
			}).then(() => {
				res.redirect('/users/profile/');
			});
		}
	}
};

module.exports = usersController;