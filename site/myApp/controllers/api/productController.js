const path = require('path');
const db = require('../../database/models');
const { Sequelize } = require('../../database/models');



const productController = {

	root: (req, res) => {

		async function productData(){

			var countByCategory = [];
		
			var categorias = await db.Categorias.findAll();
		
			for(let i = 0; i < categorias.length; i++){
				
				resultado = await db.Productos.count({where: {id_category: categorias[i].id}});
		
				countByCategory.push({
					category: categorias[i].name,
					count: resultado
				});
				
			}

			var productos = await db.Productos.findAll({
				include: [{association: 'categorias'}]
			});	//ACÁ HAY QUE PONER QUE MUESTRE COMO NOMBRE DE CATEGORIA Y NO COMO ID

			for(let i = 0; i < productos.length; i++){
				productos[i].setDataValue('endpoint', '/api/products/' + productos[i].id);
			}

			productsAPIData = {
				meta: {
					status: 200,
					count: productos.length,
					countByCategory: countByCategory,
					url: '/api/products'
				},
				data: productos
			}

			return(productsAPIData);
		}

		productData().then(data => {res.json(data)}).catch(error => {res.send('NO SE PUEDE ENTREGAR LA INFORMACIÓN')});


	},

	detail: (req, res) => {
		const productId = req.params.id;

		db.Productos.findByPk(productId, {
			include: [{association: 'categorias'}]
		}).then((producto) => {

			productsAPIData = {
				meta: {
					status: 200,
					url: '/api/products/' + productId
				},
				data: producto
			}

			res.json(productsAPIData);
		});
	},

	opcional: (req, res) => {

		let limit = Number(req.query.limit);
		let offset = Number(req.query.offset);

		async function productData(){

			var countByCategory = [];
		
			var categorias = await db.Categorias.findAll();
		
			for(let i = 0; i < categorias.length; i++){
				
				resultado = await db.Productos.count({where: {id_category: categorias[i].id}});
		
				countByCategory.push({
					category: categorias[i].name,
					count: resultado
				});
				
			}

			var productos = await db.Productos.findAndCountAll({
				include: [{association: 'categorias'}],
				limit: limit,
				offset: offset
			});	//ACÁ HAY QUE PONER QUE MUESTRE COMO NOMBRE DE CATEGORIA Y NO COMO ID

			for(let i = 0; i < productos.rows.length; i++){
				productos.rows[i].setDataValue('endpoint', '/api/products/' + productos.rows[i].id);
			}

			let backOffset = offset - limit;
			let nextOffset = offset + limit;

			if(backOffset < 0 ){backOffset = 0;}
			if(nextOffset >= productos.count){nextOffset = offset}

			productsAPIData = {
				meta: {
					status: 200,
					count: productos.count,
					countByCategory: countByCategory,
					url: '/api/products',
					back: `/api/users/opc?limit=${limit}&offset=${backOffset}`,
					next: `/api/users/opc?limit=${limit}&offset=${nextOffset}`
				},
				data: productos.rows
			}

			return(productsAPIData);
		}

		productData().then(data => {res.json(data)}).catch(error => {res.send('NO SE PUEDE ENTREGAR LA INFORMACIÓN')});
	}
};

module.exports = productController;
