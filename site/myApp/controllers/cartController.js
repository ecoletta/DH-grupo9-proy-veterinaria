const { response } = require("express");
const db = require('../database/models');



const productController = {
    root: (req, res) => {
        res.render('carrito', { title: 'Express' });
    },

    pay: (req, res) => {

        var date = new Date();

        const newOrder = {
            date: date,
            id_user: 1,
        };

        async function loadOrder() {
            var order = await db.Orden.create(newOrder);

            for (i = 0; i < req.body.length; i++) {
                const newCompra = {
                    id_orden: order.dataValues.id,
                    id_product: req.body[i].id,
                    total: req.body[i].total
                }

                await db.Compra.create(newCompra);
            }

            res.json({
                status: 201
            })

        }

        loadOrder().catch(e => {
            console.log(e.message);
            // console.log(e);
            res.json({
                status: 500,
                message: e.message
            })
        }

        );
    }
}

module.exports = productController;
