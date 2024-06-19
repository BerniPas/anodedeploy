const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = require('./index');

//conectar a la dabase
const conexion = require('./database/conexion');


//levantar el server
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})