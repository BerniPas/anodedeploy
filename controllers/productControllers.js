import { request, response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Product from '../models/productModel.js'
import conexion from '../database/conexion.js';



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
    //conectamos la database
    await conexion.open();

    try {
        
        const producto = await Product.find();
        
        console.log(producto);
        
        res.render('cardsProductos', {
            producto
            });
    } catch (error) {
        console.log(error);
        return res.render('error', {
            error: 'No se ha encontrado el producto'
        })
    } finally {
        console.log('Consulta exitosa');
        //cerramos la conexión
        //await conexion.close();
    }
        
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

const updateFormProductos = async (req, res) => {
    
    const idProduct = req.params._id;

    console.log(idProduct);

    try {

        const producto = await Product.findById({_id: idProduct});
        console.log(producto);
    
        const _id = producto._id;
        const imagen = producto.imagen;
        const nombre = producto.nombre;
        const precio = producto.precio;
        const descripcion = producto.descripcion;
        
        console.log(imagen);
    
    
        return res.render('updateForm', {
            _id,
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


const deleteProductos = async (req, res) => {

    const idProduct = req.params._id;

    console.log(idProduct);

    try {

        const producto = await Product.findByIdAndDelete({_id: idProduct});
        console.log(producto);
    
        return res.render('hecho')
        
    } catch (error) {
        console.log(error);
        return res.render('error', {
            error: 'No se ha encontrado el producto'
        })
    }

}

const updateProductos = async (req, res) => {
    const idProduct = req.params._id;

/*     const producto = {
        _id: idProduct,
        nombre: req.body.nombre,
        precio: req.body.precio,
        ...
    } */

    console.log(idProduct);

    try {

        const producto = await Product.findByIdAndUpdate({_id: idProduct}, req.body, {new: true});
        console.log(producto);
    
        return res.render('index')
        
    } catch (error) {
        console.log(error);
        return res.render('error', {
            error: 'No se ha encontrado el producto'
        })
    } finally {
        console.log('Actualización exitosa');

        //cerramos la conexión
        //await conexion.close();
    }

}


export {
    formProductos,
    registerProductos,
    cardProductos,
    getProductos,
    detalleProductos,
    updateFormProductos,
    updateProductos,
    deleteProductos
}

//by Gustavo