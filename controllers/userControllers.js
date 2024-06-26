import { request, response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/userModel.js'; 
import enviarMail from '../servicios/enviarEmail.js';




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

        res.cookie('auth-token', token,
            {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                path: '/'
            }).render('formProductos');


    } catch (error) {
        const err = 'Email o Contraseña Incorrectos'
        console.log(error);
        return res.render('error', {
            error: err
        })
    }


}

const cerrarSesion = (req, res) => {

    res.clearCookie('auth-token').render('login');

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

export {
    dameFormulario,
    dameLogin,
    crearUsuarios,
    loginUsuarios,
    actualizarUsuarios,
    eliminarUsuarios,
    dameUsuarios,
    cerrarSesion
};