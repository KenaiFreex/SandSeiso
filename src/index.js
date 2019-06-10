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


var NodeWebcam = require("node-webcam");

var Webcam = NodeWebcam.create({
  callbackReturn: "base64",
  saveShots: false,
  width: 640,
  height: 360,
  quality: 0,
  device: '/dev/video0',
 
});



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
app.use(express.urlencoded({
  extended: false
}));
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
app.use(require('./routes/config'));



//--------------------------------//
/////////////ESCUCHANDO/////////////////
//------------------------------//
server.listen(app.get('port'), () => {

  console.log(`Escuchando en puerto ${app.get('port')}`);

});




//--------------------------------//
/////////////WebSOckets/////////////////
//------------------------------//


var activeFlag = false;

io.sockets.on('connection', function (socket) { // WebSocket Connection

  socket.on("direccion", (data) => {

    let contador = 0;
    for (let i in data.flag) {

      if (data.flag[i]) {

        contador++;
      }
    }

    if (contador <= 1) {

      for (let i in data.flag) {

        if (data.flag[i]) {

          //console.log(`${i} ALTO`);

        }
        if (!data.flag[i]) {

          //console.log(`${i} BAJO`);
        }

      }

    } else {

      console.log("No permitido");

    }

  });

  socket.on("online", (data) => {


    Webcam.capture("test", (err, data) => {

      socket.emit("webcam", data);

    });

  });



});