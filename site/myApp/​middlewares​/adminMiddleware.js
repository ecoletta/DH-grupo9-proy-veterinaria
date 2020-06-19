
function adminMiddleware(req, res, next){

    if(req.session.user != undefined){

        if(req.session.category == 'admin'){
            next();
        } else {
            res.render('login', {
				error: 'Ingrese como administrador',
				user: req.session.user
			});
        }
    } else {
        res.render('login', {
            error: 'No se encuentra logueado'
        });
    }
}

module.exports = adminMiddleware;