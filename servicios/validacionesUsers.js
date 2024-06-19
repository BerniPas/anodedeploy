const { validationResult } = require('express-validator');


const validarJWT = (token) => {
    
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        return res.render('error', {
            error: 'Algunos datos son incorrectos'
        })
    }

    return true

}

module.exports = validarUsuario;