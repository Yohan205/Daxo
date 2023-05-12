/**
 * | countFiles |
 * @param {String} ruta ./carpeta/
 * @param {String} extension archivo.extension
 * @return Total de archivos
 */
function totalArchivos(ruta, extension) {
    const fs = require("fs"); //Requerimos el modulo fs -> npm i fs
    const cDirectorio = fs.readdirSync(ruta);//Definimos cDirectorio, que devolvera una lista de las carpetas/directorios
    var n = 0 //Inicializamos la variable n que contendrá el total de los archivos con la extensión especificada
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

/**
 * | separarString |
 * @param {String} str chain of text
 * @param {Number} maxLength maximum length of the string
 * @return Array of separar strings
 */
function separarString(str, maxLength) {
    const result = [];
  
    while (str.length > maxLength) {
      result.push(str.substr(0, maxLength));
      str = str.substr(maxLength);
    }
  
    if (str.length > 0) {
      result.push(str);
    }
  
    return result;
  }

/**
   *  | Compare two arrays |
   * @param {Array} arr1 
   * @param {Array} arr2 
   * @return Boolean
   */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    const values1 = Object.values(obj1);
    const values2 = Object.values(obj2);

	if (values1[0] !== values2[0]) {
		return false;
	}

    /*for (let j = 0; j < values1.length; j++) {
      const key = values1[j];
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (!arraysEqual(val1, val2)) {
          return false;
        }
      } else if (typeof val1 === 'object' && typeof val2 === 'object') {
        if (!arraysEqual([val1], [val2])) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }*/
  }

  return true;
}

module.exports = {
    "countFiles": totalArchivos,
    separarString, arraysEqual
}