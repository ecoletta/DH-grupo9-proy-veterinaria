const path = require('path');
const db = require('../../database/models');
const { Sequelize } = require('../../database/models');



const userController = {

	root: (req, res) => {

		async function userData(){

            var users = await db.Usuarios.findAll({attributes: ['id', 'first_name', 'last_name', 'email']});

			for(let i = 0; i < users.length; i++){
				users[i].setDataValue('endpoint', '/api/users/' + users[i].id);
			}

			usersAPIData = {
				meta: {
					status: 200,
					count: users.length,
					url: '/api/users'
				},
				data: users
			}

			return(usersAPIData);
		}

		userData().then(data => {res.json(data)}).catch(error => {res.send('NO SE PUEDE ENTREGAR LA INFORMACIÓN')});

	},

	detail: (req, res) => {
		const userId = req.params.id;

		db.Usuarios.findByPk(userId, {
			attributes: { exclude: ['password', 'category'] }
		  }).then((usuario) => {

			usuario.image = '/images/img_users/' + usuario.image;

			userAPIData = {
				meta: {
					status: 200,
					url: '/api/users/' + userId
				},
				data: usuario
			}

			res.json(userAPIData);
		});
	},

	opcional: (req, res) => {

		let limit = Number(req.query.limit);
		let offset = Number(req.query.offset);

		async function userData(){
            var users = await db.Usuarios.findAndCountAll({
				attributes: ['id', 'first_name', 'last_name', 'email'],
				limit: limit,
				offset: offset
			});

			let backOffset = offset - limit;
			let nextOffset = offset + limit;

			if(backOffset < 0 ){backOffset = 0;}
			if(nextOffset >= users.count){nextOffset = offset}

			for(let i = 0; i < users.rows.length; i++){
				users.rows[i].setDataValue('endpoint', '/api/users/' + users.rows[i].id);
			}

			usersAPIData = {
				meta: {
					status: 200,
					count: users.length,
					url: '/api/users',
					back: `/api/users/opc?limit=${limit}&offset=${backOffset}`,
					next: `/api/users/opc?limit=${limit}&offset=${nextOffset}`
				},
				data: users.rows
			}
			return(usersAPIData);
		}
		userData().then(data => {res.json(data)}).catch(error => {res.send('NO SE PUEDE ENTREGAR LA INFORMACIÓN')});
	}
};

module.exports = userController;
