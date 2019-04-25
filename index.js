const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const path = require('path');
const exphbs = require('express-handlebars');
var fs = require('fs'); 
var direction = require("./sockets/ManualControl/direction.js");


const io = require('socket.io')(server);

//--------------------------------//
/////////////SETUP/////////////////
//------------------------------//

app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(express.static(app.get('public')));

app.engine('.hbs', exphbs({

  defaultLayout: 'main.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),

}));

app.set('view engine', '.hbs');


//--------------------------------//
/////////////ROUTES/////////////////
//------------------------------//
app.use(require('./routes/manual.js'));
app.use(require('./routes/index.js'));


//--------------------------------//
/////////////ESCUCHANDO/////////////////
//------------------------------//
server.listen(80, () => {

  console.log('Escuchando en puerto 3000');

});

//--------------------------------//
/////////////WebSOckets/////////////////
//------------------------------//
io.sockets.on('connection', function (socket) { // WebSocket Connection

  socket.on("arriba", (data) => {


    direction.ActivarGPIO("arriba", data);

  });

  socket.on("izquierda", (data) => {
    direction.ActivarGPIO("izquierda", data);

  });
  socket.on("derecha", (data) => {

    direction.ActivarGPIO("derecha", data);
  });
  socket.on("abajo", (data) => {

    direction.ActivarGPIO("abajo", data);
  });




});