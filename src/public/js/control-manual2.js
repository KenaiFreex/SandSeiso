var socket = io(); //load socket.io-client and connect to the host that serves the page


window.addEventListener("load", function () {

  var img = document.getElementById('webcam');
  FPS = 20;
  setInterval(() => {
    socket.emit("online");
    socket.on("webcam",(data) =>{

      var oldImg = document.getElementById('webcam');
      var newImg = new Image();
      newImg.src = data;
      newImg.id = 'webcam';
      oldImg.parentNode.replaceChild(newImg, oldImg);
  
    });
  }, 1000/FPS);

  var flag = {
    "arriba": false,
    "izquierda": false,
    "derecha": false,
    "abajo": false,
  };

  var eventos = {
    "arriba": document.getElementById("arriba"),
    "izquierda": document.getElementById("izquierda"),
    "derecha": document.getElementById("derecha"),
    "abajo": document.getElementById("abajo"),
  };
  
  
  
  // Setup our function to run on various events
  var sendData =  (event,estado,mensaje) => {
    //IF ARRIBA
    if(mensaje === "arriba" && estado === true){
     
      flag.arriba = true;
      emision();

    }
    if(mensaje === "arriba" && estado === false){

      flag.arriba = false;
      emision();

    } 
    //!IF ARRIBA


      //IF IZQUIERDA
      if(mensaje === "izquierda" && estado === true){

      flag.izquierda = true;
      emision();


    }
    if(mensaje === "izquierda" && estado === false){

      flag.izquierda = false;
      emision();


    } 
      //!IF IZQUIERDA

    //IF DERECHA
    if(mensaje === "derecha" && estado === true){

      flag.derecha = true;
      emision();


    }
    if(mensaje === "derecha" && estado === false){

      flag.derecha = false;
      emision();


    } 
    //!IF DERECHA
    //IF ABAJO
    if(mensaje === "abajo" && estado === true){

      flag.abajo = true;
      emision();


    }
    if(mensaje === "abajo" && estado === false){

      flag.abajo = false;
      emision();

    //!IF ABAJO

    }


  };


  function emision(){
    socket.emit("direccion",{
      "flag":flag,
    });
  
  }
  
  // Add our event listeners

  /*
  eventos.arriba.addEventListener('mousedown', sendData.bind(null, event,true,"arriba"), {passive: true});
  eventos.arriba.addEventListener('mouseup', sendData.bind(null,event,false,"arriba"),{passive: true});
  eventos.arriba.addEventListener('mouseout', sendData.bind(null,event,false,"arriba"), {passive: true});



  eventos.abajo.addEventListener('mousedown', sendData.bind(null, event,true,"abajo"), {passive: true});
  eventos.abajo.addEventListener('mouseup', sendData.bind(null,event,false,"abajo"), {passive: true});
  eventos.abajo.addEventListener('mouseout', sendData.bind(null,event,false,"abajo"), {passive: true});

  
  eventos.izquierda.addEventListener('mousedown', sendData.bind(null, event,true,"izquierda"), {passive: true});
  eventos.izquierda.addEventListener('mouseup', sendData.bind(null,event,false,"izquierda"), {passive: true});
  eventos.izquierda.addEventListener('mouseout', sendData.bind(null,event,false,"izquierda"), {passive: true});
  
  eventos.derecha.addEventListener('mousedown', sendData.bind(null, event,true,"derecha"), {passive: true});
  eventos.derecha.addEventListener('mouseup', sendData.bind(null,event,false,"derecha"), {passive: true});
  eventos.derecha.addEventListener('mouseout', sendData.bind(null,event,false,"derecha"), {passive: true});
  

*/

$("#arriba").on("mousedown touchstart",(sendData.bind(null, event,true,"arriba")))
$("#arriba").on("mouseup touchend touchcancel mouseout",(sendData.bind(null, event,false,"arriba")))

$("#izquierda").on("mousedown touchstart",(sendData.bind(null, event,true,"izquierda")))
$("#izquierda").on("mouseup touchend touchcancel mouseout",(sendData.bind(null, event,false,"izquierda")))

$("#derecha").on("mousedown touchstart",(sendData.bind(null, event,true,"derecha")))
$("#derecha").on("mouseup touchend touchcancel mouseout",(sendData.bind(null, event,false,"derecha")))

$("#abajo").on("mousedown touchstart",(sendData.bind(null, event,true,"abajo")))
$("#abajo").on("mouseup touchend touchcancel mouseout",(sendData.bind(null, event,false,"abajo")))


});


 







