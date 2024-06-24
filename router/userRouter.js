import express from 'express';
import { check } from 'express-validator';

import { 
    dameFormulario,
    crearUsuarios,
    loginUsuarios,
    dameLogin,
    dameUsuarios,
    actualizarUsuarios,
    eliminarUsuarios,
    cerrarSesion
} from '../controllers/userControllers.js';

const router = express.Router();


/* 
    esta ruta respondea /user
 */

//crear un array de users
//let users = { id: 1, name: 'Jhon', email: 'jhon@gmail.com' }

//R: leer los datos
router.get('/', dameUsuarios);

router.get('/form', dameFormulario);

router.get('/formLogin', dameLogin);

//C: crear un nuevo usuario
router.post('/form', [
    check("nombre").isString().isLength({min: 3}),
    check("email").isEmail(),
    check("password").isString().isLength({min: 6})
], crearUsuarios);

//Ruto del Login
router.post('/login', [
    check("email").isEmail(),
    check("password").isString().isLength({min: 6})
], loginUsuarios);

router.post('/logout', cerrarSesion);

//U: actualizar un usuario
router.put('/', actualizarUsuarios);


//D: eliminar un usuario
router.delete('/', eliminarUsuarios);


export default router;