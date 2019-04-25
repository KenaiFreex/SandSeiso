var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO



var LED = {
    "Gpio12": new Gpio(12, 'out'),
    'Gpio19': new Gpio(19, 'out'),
    "Gpio26": new Gpio(26, 'out'),
    "Gpio24": new Gpio(24, 'out'),
    "Gpio23": new Gpio(23, 'out'),
    "Gpio17": new Gpio(17, 'out'),

}




function ActivarGPIO(direccion, data) {

    datos = data.mensaje;
    estado = data.estado;

    gpio = (direccion == "arriba") ? LED.Gpio12 :
        (direccion == "abajo") ? LED.Gpio19 :
        (direccion == "derecha") ? LED.Gpio26 :
        (direccion == "izquierda") ? LED.Gpio24 :
        null;

    gpioNumber = (direccion == "arriba") ? "LED.Gpio12" :
        (direccion == "abajo") ? "LED.Gpio19" :
        (direccion == "derecha") ? "LED.Gpio26" :
        (direccion == "izquierda") ? "LED.Gpio24" :
        null;

    if (estado == true) {

        gpio.writeSync(1);
        console.log(gpioNumber + " encendido");

    } else {
        console.log(gpioNumber + " apagado");
        gpio.writeSync(0);

    }
    console.log(datos);
    console.log(estado);


};

module.exports.ActivarGPIO = ActivarGPIO;