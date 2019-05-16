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
    direction.ActivarGPIO("izquierda", 255, data);

  });
  socket.on("derecha", (data) => {

    direction.ActivarGPIO("derecha", 255, data);
  });
  socket.on("abajo", (data) => {

    tiempo = (data.tiempo/1000)*10;
    let pwmLevel = (tiempo*paso<0)?0:(tiempo*paso>255)?255:tiempo*paso;
    direction.ActivarGPIO("abajo", pwmLevel , data);
    
  });




});