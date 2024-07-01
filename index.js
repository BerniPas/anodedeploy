
//libreerías
import express from 'express';
import morgan from 'morgan';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import hbs from 'hbs';
import path from 'node:path';

const app = express();

// configuración de hbs
app.set('view engine', 'hbs');

//consfiguramos la carpeta de las vistas
app.set('views', 'views');

//configuramos el directorio de los parciales
hbs.registerPartials('views/partials');    


//express meddlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join('./public')));

//utilizamos el router como un middleware
app.use('/user', userRouter);
app.use('/product', productRouter);
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

export default app;