function userMiddleware(req, res, next){
    if(req.cookies.user != undefined){
        req.session.user = req.cookies.user;
    }
    next();
}

module.exports = userMiddleware;