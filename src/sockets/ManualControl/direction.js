//const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const Gpio = require('pigpio').Gpio;





const LED = {
    //Relés
    "R0": new Gpio(11, {
        mode: Gpio.OUTPUT
    }),
    "R1": new Gpio(13, {
        mode: Gpio.OUTPUT
    }),
    "R2": new Gpio(6, {
        mode: Gpio.OUTPUT
    }),
    "R3": new Gpio(12, {
        mode: Gpio.OUTPUT
    }),

    //motor1
    "R_EN0": new Gpio(14, {
        mode: Gpio.OUTPUT
    }),
    'L_EN0': new Gpio(13, {
        mode: Gpio.OUTPUT
    }),
    "RPWM0": new Gpio(23, {
        mode: Gpio.OUTPUT
    }),
    "LPWM0": new Gpio(24, {
        mode: Gpio.OUTPUT
    }),

    //motor2
    "R_EN1": new Gpio(17, {
        mode: Gpio.OUTPUT
    }),
    "L_EN1": new Gpio(18, {
        mode: Gpio.OUTPUT
    }),
    "RPWM1": new Gpio(16, {
        mode: Gpio.OUTPUT
    }),
    "LPWM1": new Gpio(20, {
        mode: Gpio.OUTPUT
    }),

}



function ActivarGPIO(direccion,pwmLevel_L, pwmLevel_R, data) {

    let datos = data.mensaje;
    let estado = data.estado;

    let dutyCycle = (direccion == "arriba") ? {

            //Relés
            "R0": 255,
            "R1": 255,
            "R2": 255,
            "R3": 255,
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": pwmLevel_R,
            "LPWM0": 0,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": 0,
            "LPWM1": pwmLevel_L,
        } :
        (direccion == "abajo") ? {
            //Relés
            "R0": 255,
            "R1": 255,
            "R2": 255,
            "R3": 255,
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": 0,
            "LPWM0": pwmLevel_L,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": pwmLevel_R,
            "LPWM1": 0,
        } :
        (direccion == "derecha") ? {
            //Relés
            "R0": 0,
            "R1": 0,
            "R2": 0,
            "R3": 0,
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": pwmLevel_R,
            "LPWM0": 0,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": pwmLevel_L,
            "LPWM1": 0,
        } :
        (direccion == "izquierda") ? {
            //Relés
            "R0": 0,
            "R1": 0,
            "R2": 0,
            "R3": 0,
            //motor1
            "R_EN0": 255,
            'L_EN0': 255,
            "RPWM0": 0,
            "LPWM0": pwmLevel_L,
            //motor2
            "R_EN1": 255,
            "L_EN1": 255,
            "RPWM1": 0,
            "LPWM1": pwmLevel_R,
        } : {

            //Relés
            "R0": 0,
            "R1": 0,
            "R2": 0,
            "R3": 0,
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
            if(i == "R0" || i== "R1"|| i== "R2" || i== "R3"){
                LED[i].pwmWrite(255);
                console.log(i + "255");
            }else{
                    LED[i].pwmWrite(0);
                    console.log(i + " 0");

            }
         
        }
    }

    console.log(datos);
    console.log(estado);


};

module.exports.ActivarGPIO = ActivarGPIO;



