const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const path = require('path');
const exphbs = require('express-handlebars');
var fs = require('fs'); 
var direction = require("./sockets/ManualControl/direction.js");

require('./database');


const PORT = 80;

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
server.listen(PORT, () => {

  console.log(`Escuchando en puerto ${PORT}`);

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