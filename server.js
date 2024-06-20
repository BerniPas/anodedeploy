import dotenv from 'dotenv';
import app from './index.js';
dotenv.config();


const PORT = process.env.PORT || 8080;

//conectar a la dabase
import conexion from './database/conexion.js';


//levantar el server
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})