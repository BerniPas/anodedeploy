import  dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const clientOptions = { 
    serverApi: 
        { 
            version: '1', 
            strict: true, 
            deprecationErrors: true 
        } 
    };

const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_ATLAS = process.env.MONGO_ATLAS;


const conexion = mongoose.connect(MONGO_ATLAS, clientOptions)
    .then(
        () => { 
            console.log('==========================================');
            console.log(`Conexión a la database ${MONGO_ATLAS} exitosa`);
            console.log('==========================================');
        },
        err => {
            console.log('==========================================');
            console.log(`Error en la conexión a la database ${err}`);
            console.log('==========================================');
        }
);

export default conexion;

