const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
    formProductos,
    registerProductos,
    cardProductos,
    getProductos,
    detalleProductos
} = require('../controllers/productControllers');

/* 
    responde a la ruta /product
 */

router.get('/', formProductos);
router.post('/', [
    check("nombre").isString().isLength({min: 3}),
    check("precio").isNumeric(),
    check("imagen").isString(),
    check("descripcion").isString()
], registerProductos);
router.get('/productos', getProductos)
router.get('/cards', cardProductos)
router.get('/detalle/:_id', detalleProductos)


module.exports = router;