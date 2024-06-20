

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: new Date() 
    }
});

export default mongoose.model('User', userSchema);