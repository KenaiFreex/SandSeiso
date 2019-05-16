require('./database2');
const Evasor = require('./models/evasor');


setInterval(() => {

    let modelAttributes = null;
    Evasor.findById('5cdb3bead540a80b1504c639').populate('child.name').exec().then((result) => {
        direccion = result.toObject();
        if(direccion.adelante){

            console.log("Adelante");
        }

        if(!direccion.adelante){
            console.log("Atras");
        }
    });


}, 50);


//var evasor = new Evasor({ adelante: 0, atras: 0, izquierda: 0,derecha: 0 });