// 03:11:00 | https://www.youtube.com/watch?v=-bI0diefasA
// FALTA HACER EL NAVBAR DINÁMICO SEGÚN EL USUARIO ESTÉ CON SESIÓN INICIADA O NO (EXPRESS.SESSION())
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session'); // fazt
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
// Inicialización
const app = express();
require('./database');
require('./config/passport');

// Configuración de puerto
app.set('port', process.env.PORT || 3000);

// Vistas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({                                             // Declaro Handlebars cómo motor para vistas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');                                         //

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));                                     // Para utilizar DEL o PUT en <form>
// app.use(session({                                                       // 
//     secret: 'pepe',
//     resave: true,
//     saveUninitialized: true,
//     // path: '/',
//     cookie: { secure: false },
//     maxAge: null
// }));
app.use(require('cookie-session')({
    secret: 'pepe',
    resave: true,
    saveUninitialized: true,
    // path: '/',
    cookie: { secure: false },
    maxAge: null
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Archivos estáticos
app.use('/', express.static(__dirname + '/public'));
app.use('/buy', express.static(__dirname + '/public'));
app.use('/sell', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/public'));
app.use('/help', express.static(__dirname + '/public'));

// Ruteo
const routes = {
    index:  require('./routes/index'),
    users:  require('./routes/users'),
    admin:  require('./routes/admin'),
    buy:    require('./routes/buy'),
    help:   require('./routes/help')
}
app.use(routes.index, routes.users, routes.admin, routes.buy, routes.help);

// Apertura
app.listen(app.get('port'), () => {
    console.log('Server opened in port', app.get('port'));
});