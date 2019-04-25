var socket = io(); //load socket.io-client and connect to the host that serves the page

window.addEventListener("load", function () {
    //when page loads
    var arriba = document.getElementById("arriba");
    var izquierda = document.getElementById("izquierda");
    var derecha = document.getElementById("derecha");
    var abajo = document.getElementById("abajo");

//ARRIBA//

    arriba.addEventListener("touchstart", () => {

        var tiempo = 0;

        TupInterval = window.setInterval(function () {

            socket.emit("arriba",{"mensaje": "Botón Arriba " + tiempo +"ms","estado": true});          
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });


    arriba.addEventListener("touchend", () => {
        
        window.clearInterval(TupInterval);
        socket.emit("arriba",{"mensaje": "Botón Arriba libre","estado": false});

        
    }); 



    arriba.addEventListener("mousedown", () => {

        var tiempo = 0;

        upInterval = window.setInterval(function () {

            socket.emit("arriba",{"mensaje": "Botón Arriba " + tiempo +"ms","estado": true});         
           tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    arriba.addEventListener("mouseup", () => {
        
        window.clearInterval(upInterval);
        socket.emit("arriba",{"mensaje": "Botón Arriba libre","estado": false});

        
    });


    //IZQUIERDA


    izquierda.addEventListener("mousedown", () => {

        var tiempo = 0;

        leftInterval = window.setInterval(function () {

            socket.emit("izquierda",{"mensaje": "Botón izquierda " + tiempo +"ms","estado": true});          
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    izquierda.addEventListener("mouseup", () => {
        
        window.clearInterval(leftInterval);
        socket.emit("izquierda",{"mensaje": "Botón izquierda libre","estado": false});

        
    });

    izquierda.addEventListener("touchstart", () => {

        var tiempo = 0;

        TleftInterval = window.setInterval(function () {

            socket.emit("izquierda",{"mensaje": "Botón izquierda " + tiempo +"ms","estado": true});          
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    izquierda.addEventListener("touchend", () => {
        
        window.clearInterval(TleftInterval);
        socket.emit("izquierda",{"mensaje": "Botón izquierda libre","estado": false});

        
    });




    //DERECHA
    derecha.addEventListener("mousedown", () => {

        var tiempo = 0;

        rightInterval = window.setInterval(function () {

            socket.emit("derecha",{"mensaje": "Botón derecha " + tiempo +"ms","estado": true});           
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    derecha.addEventListener("mouseup", () => {
        
        window.clearInterval(rightInterval);
        socket.emit("derecha",{"mensaje": "Botón derecha libre","estado": false});

        
    });
    derecha.addEventListener("touchstart", () => {

        var tiempo = 0;

        TrightInterval = window.setInterval(function () {

            socket.emit("derecha",{"mensaje": "Botón derecha " + tiempo +"ms","estado": true});           
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    derecha.addEventListener("touchend", () => {
        
        window.clearInterval(TrightInterval);
        socket.emit("derecha",{"mensaje": "Botón derecha libre","estado": false});

        
    });


 


    //ABAJO
    abajo.addEventListener("mousedown", () => {

        var tiempo = 0;

        downInterval = window.setInterval(function () {

            socket.emit("abajo",{"mensaje": "Botón abajo " + tiempo +"ms","estado": true});           
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    abajo.addEventListener("mouseup", () => {
        
        window.clearInterval(downInterval);
        socket.emit("abajo",{"mensaje": "Botón abajo libre","estado": false});

        
    });
    abajo.addEventListener("touchstart", () => {

        var tiempo = 0;

        TdownInterval = window.setInterval(function () {

            socket.emit("abajo",{"mensaje": "Botón abajo " + tiempo +"ms","estado": true});           
            tiempo+=100;
        }, 100); // <== runs every 10 milliseconds
        
    });



    abajo.addEventListener("touchend", () => {
        
        window.clearInterval(TdownInterval);
        socket.emit("abajo",{"mensaje": "Botón abajo libre","estado": false});

        
    });


});
