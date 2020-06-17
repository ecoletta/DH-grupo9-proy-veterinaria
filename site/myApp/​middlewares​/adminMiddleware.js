const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function adminMiddleware(req, res, next){

    if(req.session.user != undefined){
        const email = req.session.user;

        user = users.find(user => user.email == email);
        if(user.category == 'admin'){
            next();
        }
    }
    res.send('no tiene permisos de administrador');
}

module.exports = adminMiddleware;