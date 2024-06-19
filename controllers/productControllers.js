const { request, response } = require('express')
const Product = require('../models/productModel')
const dotenv = require('dotenv')
dotenv.config()
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const formProductos = async (req = request, res = response) => {

    const token = req.headers.auth-token;

    console.log(token);

    /* const miFirma = process.env.JWT_SECRET;

    const user = await jwt.verify(token, miFirma)

    console.log(user);
    console.log(user.nombre); */

    //verificar si el JWT es valido
    res.render('formProductos')
}

//Consulta de productos

const getProductos = async (req = request, res = response) => {

    const productos = await Product.find({});

    console.log(productos);

    res.render('productList', {
        producto: productos
    });

}

// Registro de nuevo producto

const registerProductos = async (req = request, res = response) => {

    const validar = validationResult(req);

    if(!validar.isEmpty()){
        return res.render('error', {
            error: 'Algunos datos son incorrectos'
        })
    }

    const { nombre, precio, imagen, descripcion } = req.body

    const producto = {
        nombre: nombre,
        precio: Number(precio),
        imagen: imagen,
        descripcion: descripcion
    }

    try {

        const nuevoProducto = new Product(producto)
        const productoRegistrado = await nuevoProducto.save()

        if (productoRegistrado) {
            console.log("Producto agregado exitosamente")
            return res.render('formProductos', { message: 'producto cargardo con exito' })
        } else {
            return res.render('error', {
                error: 'No se ha podido cargar el producto'
            })
        }
    }
    catch (error) {
        const err = "Error en el registro de producto"
        console.log(error)
        return res.render('error', {
            error: err
        })
    }

}


const cardProductos = async (req = request, res = response) => {
    
    const producto = await Product.find();
    
    console.log(producto);
    
    res.render('cardsProductos', {
        producto
        });
        
}



const detalleProductos = async (req = request, res = response) => {

    const idProduct = req.params._id;

    console.log(idProduct);

    try {

        const producto = await Product.findById({_id: idProduct});
        console.log(producto);
    
        const imagen = producto.imagen;
        const nombre = producto.nombre;
        const precio = producto.precio;
        const descripcion = producto.descripcion;
        
        console.log(imagen);
    
    
        return res.render('detalleProductos', {
            imagen,
            nombre,
            precio,
            descripcion
        })
        
    } catch (error) {
        console.log(error);
        return res.render('error', {
            error: 'No se ha encontrado el producto'
        })
    }
    
}

module.exports = {
    formProductos,
    registerProductos,
    cardProductos,
    getProductos,
    detalleProductos
}

//by Gustavo