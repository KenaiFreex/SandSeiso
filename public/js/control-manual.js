var socket = io(); //load socket.io-client and connect to the host that serves the page
window.addEventListener("load", function () {

    var tiempo = 0;
    var intervalDirection = [];
    var j = 0;

    var eventos = {
        "arriba": document.getElementById("arriba"),
        "izquierda": document.getElementById("izquierda"),
        "derecha": document.getElementById("derecha"),
        "abajo": document.getElementById("abajo"),
    };


    var emitirFinal = (event, eventInterval, boton) => {

        window.clearInterval(eventInterval);
        socket.emit(boton, {
            "mensaje": "Botón " + boton + " libre",
            "estado": false
        });

        tiempo = 0;
    };


    var emitirInicio = (event, boton) => {

        socket.emit(boton, {
            "mensaje": "Botón " + boton + " " + tiempo + "ms",
            "estado": true,
            "tiempo": tiempo
        });
        tiempo += 100;

    };



    for (let i in eventos) {
        //FOR PC
        eventos[i].addEventListener("mousedown", (e) =>
            intervalDirection[j] = window.setInterval((event) => emitirInicio(event, i), 100), false);



        eventos[i].addEventListener("mouseup", (event) => {

            emitirFinal(event, intervalDirection[j], i);

        });

        eventos[i].addEventListener("mouseout", (event) => {

            emitirFinal(event, intervalDirection[j], i);

        });
        //FOR SMARTHPHONE
        eventos[i].addEventListener("touchstart", (e) =>
            intervalDirection[j] = window.setInterval((event) => emitirInicio(event, i), 100), false);



        eventos[i].addEventListener("touchend", (event) => {

            emitirFinal(event, intervalDirection[j], i);

        });

        eventos[i].addEventListener("touchcancel", (event) => {

            emitirFinal(event, intervalDirection[j], i);

        });

        j++;
    }

});