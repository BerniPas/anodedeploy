
//libreerías
const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./router/userRouter');
const hbs = require('hbs');
const path = require('node:path');


// configuración de hbs
app.set('view engine', 'hbs');

//consfiguramos la carpeta de las vistas
app.set('views', './views');

//configuramos el directorio de los parciales
hbs.registerPartials(__dirname + '/views/partials');    


//express meddlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

//utilizamos el router como un middleware
app.use('/user', userRouter);
app.use('/product', require('./router/productRouter'));
//app.use('/admin', adminRouter);
//app.use('/login', loginRouter);

console.log(new Date() );
console.log(Date.now());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('*', (req, res) => {
    res.render('error');
});




module.exports = app;