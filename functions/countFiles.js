const fs = require("fs");

module.exports = 
/**
 * | countFiles |
 * @param {String} ruta ./carpeta/
 * @param {String} extension archivo.extension
 * @returns Total de archivos
 */
(ruta,extension) => {
    //Definimos cDirectorio, que devolvera una lista de las carpetas/directorios
    const cDirectorio = fs.readdirSync(ruta);
    //Inicializamos la variable n que contendrá el total de los archivos con la extensión especificada
    var n = 0;
    for (var i = 0; i < cDirectorio.length; i++) {
        //El bucle se empleara para recorrer las carpetas contenidas en la lista cDirectorio
        var cadena = ruta + cDirectorio[i] + "/" 
        //La variable cadena contiene el path de el directorio especificado
        var contenido = fs.readdirSync(cadena).filter(file => file.endsWith(extension))
        //Contenido devuelve el total de archivos en cada carpeta con su extension especifica
        n += contenido.length; //Declaracion del contador que acumula la suma de los archivos de la carpeta
    }
    return n
}