
//--------------------------------//
/////////////WebSOckets/////////////////
//------------------------------//
io.sockets.on('connection', function (socket) { // WebSocket Connection

  socket.on("arriba", (data) => {


    let pwmLevel_L = NivelPWM(data,5,100,255);
    let pwmLevel_R = NivelPWM(data,5,55,200);

    direction.ActivarGPIO("arriba", pwmLevel_L,pwmLevel_R , data);

  });

  socket.on("izquierda", (data) => {

    direction.ActivarGPIO("izquierda", 255, 255,data);

  });
  socket.on("derecha", (data) => {

    direction.ActivarGPIO("derecha", 255, 255, data);
  });
  socket.on("abajo", (data) => {

    let pwmLevel_L = NivelPWM(data,5,100,255);
    let pwmLevel_R = NivelPWM(data,5,100,255);
;
    direction.ActivarGPIO("abajo", pwmLevel_L,pwmLevel_R, data);
    
  });




});


function NivelPWM(data,paso,inicioPWM,finPWM){

  tiempo = (data.tiempo/1000)*10;
  return (tiempo*paso<inicioPWM)?inicioPWM:(tiempo*paso>finPWM)?finPWM:tiempo*paso;

}