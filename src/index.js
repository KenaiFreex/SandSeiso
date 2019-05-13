const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();
const http = require('http');
const server = http.Server(app);
const direction = require("./sockets/ManualControl/direction.js");

const io = require('socket.io')(server);

require('./database');
require('./config/passport');



//--------------------------------//
/////////////SETUP/////////////////
//------------------------------//
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(express.static(app.get('public')));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//--------------------------------//
/////////////ROUTES/////////////////
//------------------------------//
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/manual'));
app.use(require('./routes/index'));


//--------------------------------//
/////////////ESCUCHANDO/////////////////
//------------------------------//
server.listen(app.get('port'), () => {

  console.log(`Escuchando en puerto ${app.get('port')}`);

});






const paso = 5;

//--------------------------------//
/////////////WebSOckets/////////////////
//------------------------------//
io.sockets.on('connection', function (socket) { // WebSocket Connection

  socket.on("arriba", (data) => {

    tiempo = (data.tiempo/1000)*10;
    let pwmLevel = (tiempo*paso<0)?0:(tiempo*paso>255)?255:tiempo*paso;
    direction.ActivarGPIO("arriba", pwmLevel , data);

  });

  socket.on("izquierda", (data) => {
    direction.ActivarGPIO("izquierda", 50, data);

  });
  socket.on("derecha", (data) => {

    direction.ActivarGPIO("derecha", 50, data);
  });
  socket.on("abajo", (data) => {

    tiempo = (data.tiempo/1000)*10;
    let pwmLevel = (tiempo*paso<0)?0:(tiempo*paso>255)?255:tiempo*paso;
    direction.ActivarGPIO("abajo", pwmLevel , data);
    
  });




});