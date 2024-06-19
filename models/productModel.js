const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    precio: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: new Date() 
    }
});

module.exports = mongoose.model('Product', productSchema);