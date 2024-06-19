const { request, response } = require('express');
const User = require('../models/userModel'); 
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const enviarMail = require('../servicios/enviarEmail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();




const dameUsuarios = async (req = request, res = response) => {

    const usuarios = await User.find({});

    console.log(usuarios);

    res.render('userList', {
        usuario: usuarios
    });

}

const dameFormulario = (req = request, res = response) => {
    res.render('formulario');
}   

const dameLogin = (req = request, res = response) => {
    res.render('login');
}   


//Create: Creamos el User
const crearUsuarios = async (req = request, res = response) => {
    
    const validar = validationResult(req);

    const { nombre, email, password } = req.body;

    if(!validar.isEmpty()){
        return res.render('error', {
            error: 'Algunos datos son incorrectos'
        })
    }

    //validamos que el usuario no exista
    const usuariosExiste = await User.findOne({email: email});

    console.log(usuariosExiste);

    if(usuariosExiste){
        return res.render('error', {
            error: 'El usuario ya existe'
        })
    }

    const persona = {
        nombre: nombre,
        email: email,
        password: password
    }
    
    try {
        //generamos la salt para encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        
        //encriptamos la contraseña
        persona.password = await bcrypt.hash(password, salt);
    
        const user = new User(persona);
        
        const userCreado = await user.save();

        enviarMail(nombre, email).then(() => {
            console.log('Correo enviado')
        }).catch((err) => {
            let error = 'No se pudo enviar el correo'
        });

        if(userCreado){
            return res.render('login')
        }else{
            return res.render('error', {
                error: 'No se pudo crear el usuario'
            })
        }
    
    } catch (error) {

        const err = 'Tenemos un error en la creación de usuarios'
        console.log(error);
        return res.render('error', {
            error: err
        })

    }

}

//Login de usuarios
const loginUsuarios = async (req = request, res = response) => {

    const { email, password } = req.body;

    const validar = validationResult(req);

    if(!validar.isEmpty()){
        return res.render('error', {
            error: 'Algunos datos son incorrectos'
        })
    }

    //console.log(email, password);

    try {

        const user = await User.findOne({email})

        console.log(user);

        if(!user){
            const err = 'Debe registrarse para acceder a la app'
            return res.render('formulario', {
                error: err
            })
        }

        //desencriptamos el password
        const passwordValido = await bcrypt.compare(password, user.password);

        if(!passwordValido){
            const err = 'Email o Contraseña Incorrectos'
            return res.render('error', {
                error: err
            })
        }

        const miFirma = process.env.JWT_SECRET;
        //iniciar una session

        //agregar el JWT
        const token = jwt.sign({
            nombre: user.nombre
        }, miFirma, {        
            expiresIn: '1h'
        });

        res.header('auth-token', token).render('formProductos', { token: token });


    } catch (error) {
        const err = 'Email o Contraseña Incorrectos'
        console.log(error);
        return res.render('error', {
            error: err
        })
    }


}



const actualizarUsuarios = (req, res) => {

    res.json({
        actualizado: 'Datos Actualizdos'
    })
}

const eliminarUsuarios = (req, res) => {
    res.json({
        eliminado: 'Datos Eliminados'
    })
}

module.exports = {
    dameFormulario,
    dameLogin,
    crearUsuarios,
    loginUsuarios,
    actualizarUsuarios,
    eliminarUsuarios,
    dameUsuarios,
};