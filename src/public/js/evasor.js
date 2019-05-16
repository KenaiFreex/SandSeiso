var socket = io(); //load socket.io-client and connect to the host that serves the page
window.addEventListener("load", function () {

    socket.on('evasion', (message) => {
          console.log(message)
          if (message == "adelante"){
            document.getElementById("monitor-seiso").innerHTML = "adelante";
          }
          
        });


});
