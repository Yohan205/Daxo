const os = require('os'); //Módulo interno

const maxMemory = os.totalmem(); //Obtiene la cantidad total en bytes que hay de RAM (número muy largo)
const freeMemory = os.freemem(); //Obtiene la cantidad de bytes libres de memoria RAM (numero)

function getUsedMemory() {
    return {
        max: memory(maxMemory),
        free: memory(freeMemory),
        used: memory(maxMemory - freeMemory), //la memoria total menos la memoria libre es la usada
        usedByProcess: memory(process.memoryUsage().rss) //la memoria usada por el proceso
    }
}

//Esta funcion pasa los bytes a una forma más legible para los humanos
function memory(bytes = 0) {
    const gigaBytes = bytes / 1024 ** 3; //1024 ** 3 => un gigabyte en bytes

    //Si tenemos más de 1Gb de ram devuelve una string con los gigabytes y un decimal
    if (gigaBytes > 1) return `${gigaBytes.toFixed(1)} GB`;

    const megaBytes = bytes / 1024 ** 2; //1024 ** 2 => un megabyte en bytes

    //Si hay menos de 10 megabytes devuelve el valor con 2 decimales
    if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`;

    //Si hay menos de 100 megabytes devuelve el valor con 1 decimal
    if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`;

    return `${Math.floor(megaBytes)} MB`;
}

module.exports = getUsedMemory();