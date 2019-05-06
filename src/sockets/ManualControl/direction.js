//const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const Gpio = require('pigpio').Gpio;





const LED = {

    //motor1
    "R_EN0": new Gpio(13, {
        mode: Gpio.OUTPUT
    }),
    'L_EN0': new Gpio(12, {
        mode: Gpio.OUTPUT
    }),
    "RPWM0": new Gpio(19, {
        mode: Gpio.OUTPUT
    }),
    "LPWM0": new Gpio(26, {
        mode: Gpio.OUTPUT
    }),
    //motor2
    "R_EN1": new Gpio(24, {
        mode: Gpio.OUTPUT
    }),
    "L_EN1": new Gpio(23, {
        mode: Gpio.OUTPUT
    }),
    "RPWM1": new Gpio(17, {
        mode: Gpio.OUTPUT
    }),
    "LPWM1": new Gpio(18, {
        mode: Gpio.OUTPUT
    }),

}



function ActivarGPIO(direccion,pwmLevel, data) {

    let datos = data.mensaje;
    let estado = data.estado;

    let dutyCycle = (direccion == "arriba") ? {

            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": pwmLevel,
            "LPWM0": 0,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": 0,
            "LPWM1": pwmLevel,
        } :
        (direccion == "abajo") ? {
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": 0,
            "LPWM0": pwmLevel,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": pwmLevel,
            "LPWM1": 0,
        } :
        (direccion == "derecha") ? {
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": 255,
            "LPWM0": 0,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": pwmLevel,
            "LPWM1": 0,
        } :
        (direccion == "izquierda") ? {
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": 0,
            "LPWM0": pwmLevel,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": 0,
            "LPWM1": 255,
        } : {
            //motor1
            "R_EN0": 0,
            'L_EN0': 0,
            "RPWM0": 0,
            "LPWM0": 0,
            //motor2
            "R_EN1": 0,
            "L_EN1": 0,
            "RPWM1": 0,
            "LPWM1": 0,
        };

     

    if (estado == true) {
        for(let i in LED){
            LED[i].pwmWrite(dutyCycle[i]);
            console.log(i +" " + String(dutyCycle[i]));
        }


    } else {
        for(let i in LED){
            LED[i].pwmWrite(0);
            console.log(i + " 0");
        }
    }

    console.log(datos);
    console.log(estado);


};

module.exports.ActivarGPIO = ActivarGPIO;