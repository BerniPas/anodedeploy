import express from 'express';
import { check } from 'express-validator';

import {
    formProductos,
    registerProductos,
    cardProductos,
    getProductos,
    detalleProductos,
    updateFormProductos,
    updateProductos,
    deleteProductos,
} from '../controllers/productControllers.js';

const router = express.Router();
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
router.get('/updateForm/:_id', updateFormProductos);
router.post('/update/:_id', updateProductos);
router.post('/delete/:_id', deleteProductos);


export default router;
