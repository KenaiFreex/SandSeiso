var socket = io(); //load socket.io-client and connect to the host that serves the page

window.addEventListener("load", function () {
    var flag = 0;

    $('#arriba').click(function() {
       flag = 1;
    });
   
    if (flag == 1)
    {
     alert("Clicked");
    }
    else
    {
      alert("Not clicked");
    }
});

