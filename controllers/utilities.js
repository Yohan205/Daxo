//@ts-nocheck
const fetch = require('node-fetch');
const os = require('os');
const operadores = require("./operadores");
const paquetes = require("./paquetes");
const Users = require("../settings/models/Users");

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

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            // Solo IPv4 y que no sea loopback
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }
    return addresses;
}

async function dataUser(req) {
    var user = (req.user);
    var users = await Users.findOne({email: user.email});
    user.picture = await users.photo;

    return user;
}

/**
   * Expand pinterest shortenURL
   * @param { string | string[] | ParsedQs | ParsedQs[] } shortenURL Pinterest URL
   * @returns string
   */
async function expandPinURL(shortenURL) {
    const uri = new URL(shortenURL);
    const path = uri.pathname;
    const finalUrl = `https://api.pinterest.com/url_shortener${path}/redirect/`;
    
    try {
      let response = await fetch(finalUrl, {
        method: "HEAD",
        redirect: "manual",
      });
      let location = response.headers.get("location");
      return location;
    } catch (error) {
      console.error(error);
      return null;
    }
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

/**
   *  | Distube Status |
   * @param {Object} queue Object of Distube queue
   * @param {Boolean} filters on-true 
   * @param {Boolean} autoPlay on-true 
   * @return Boolean
   */
function distubeStatus(queue, filters = false, autoPlay = false) {
    const volume = `Volume: \`${queue.volume}%\``;

    const filter = ` | Filter: \`${
		queue.filters.join(', ') || 'Off'
	}\``;

    const loop = ` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\``;

    const autoplay = ` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

    const status = volume + loop + filters == true ? filter : " " + autoPlay == true ? autoplay : " ";

    return status;
}

class miPay {
	#API = "https://mipago.co/set/api.php"
	#dataBody = new Object({ 
		method: 'POST', 
		headers: {"Content-Type": "application/json"}
	})
	#results
	#data
	bill = new Map()

	/**
	 *  | MiPago - API |
	 * @param {Object} key Object with user and password 
	 * @return Constructor
	 */
	constructor(key = {}) {
		this.#data = key;
		const date = new Date();
		this.tk = `D${date.getDate()}M${(date.getMonth()+1)}A${date.getFullYear()}.H${date.getHours()}MN${date.getMinutes()}S${date.getSeconds()}`;
	}

	// @ts-ignore
	#cobroType(cobro){
		// If cobro is saldo, the type is 0
		switch (cobro.toLowerCase()) {
		case "saldo":
			return 0;
		
		case "ganancia":
			return 1;

		default:
			throw new Error("Invalid value for cobro, must be saldo or ganancia");
		}
	}

	// @ts-ignore
	#checkNumber(numero) {
		const stringNumero = String(numero).replace(/\s/g, "");
		
		if (!/^(\+57)?3\d{9}$/.test(stringNumero)) {
		return false;
		}
	
		const numero10Caracteres = stringNumero.slice(-10);
		return numero10Caracteres;
	}

	// @ts-ignore
	#cleanCost(valor) {
		const string = valor.toString();
		const numero = parseInt(string, 10);
	
		// Verificar si no es un número entero o no es múltiplo de 1000
		if (isNaN(numero) || numero % 1000 !== 0) {
		return false;
		}
	
		const sinPuntuacion = string.replace(/[.,]/g, '');
		return sinPuntuacion;
	}

	// @ts-ignore
	#checkString(toCheck) {
		if (typeof toCheck !== 'string') {
		throw new Error('It\'s not string.');
		}
		
		return toCheck.toLowerCase();
	}

	// @ts-ignore
	#fetchAPI(body) {
		// @ts-ignore
		return fetch(this.#API, body)
		.then(ans => ans.json())
		.catch(err => err);
	}
  
	/**
	 *  | MiPago - Consulta Saldo |
	 * @param {String} queryString consulta saldo or ganancia 
	 * @return {Object} Object with data or value String
	 */
	queryBalance(queryString) {
		// Check the query string
		queryString = this.#checkString(queryString);
    // Añade consulta al objeto data
    this.#data.consulta = "saldo";

    // Complete the headers with the body data in json format
    this.#dataBody.body = JSON.stringify(this.#data)

    // Realiza el fetch a la API y da como resultado un objeto con la consulta
    this.#results = this.#fetchAPI(this.#dataBody).then(res => res).catch(err => err);

    // If queryString isn't empty, so return the Saldo or Ganancia
    switch (queryString) {
      case "saldo":
        this.#results = this.#results.then( res => res.Saldo).catch(err => err)
        break;
    
      case "ganancia":
        this.#results = this.#results.then( res => res.Ganancia).catch(err => err)
        break;
      default:
        break;
    }

    return this.#results
	}

	/**
	 *  | MiPago - Consulta Venta |
	 * @param {Number} queryToken Token sent on sale
	 * @return {Object} Object with data or value String
	 */
	querySell(queryToken){
		// Añade consulta al objeto data
		this.#data.consulta = "venta";
		this.#data.tk = queryToken;
		if (!queryToken) throw new Error("Token not found"); // Realizar vericacion del token para que sea con la estructura dada

		// Complete the headers with the body data in json format
		this.#dataBody.body = JSON.stringify(this.#data)

		// Realiza el fetch a la API y da como resultado un objeto con la consulta
		return this.#fetchAPI(this.#dataBody)
		.then( ans => {ans.tk = queryToken; return ans;})
		.catch( err => err );
	}

	/**
	 *  | MiPago - Recarga |
	 * @param {number} number - Phone number to send
	 * @param {String} operador Chip operator to send
	 * @param {number} valor - Value to send in pesos
	 * @param {String} cobro Saldo - Ganancia
	 * @return {Object} Object with data
	 */
	recarga(number, operador, valor, cobro){
		number = this.#checkNumber(number)
		operador = this.#checkString(operador)
		valor = this.#cleanCost(valor);

		if (!this.#checkNumber(number)) throw new Error("Invalid phone number");

		// Check if valor is a multiple of 1000
		if (valor === false) throw new Error("Invalid cost");

		// Get the ID of the operador
		const operadorID = operadores[operador];
		if (!operadorID) throw new Error("Invalid operador E1");

    // identify the type of cobro
		cobro = this.#cobroType(cobro);
		if (this.saldo < parseInt(valor)) throw new Error("Balance insufficient");

		this.#data = Object.assign(this.#data, {
		"o": operadorID,
		"n": number,
		"v": valor,
		"tk": this.tk,
		"t": cobro
		})

    this.bill.set(this.tk, {"number": number, "value": valor, "operator": operador});

		// Complete the headers with the body data in json format
		this.#dataBody.body = JSON.stringify(this.#data);

		this.#fetchAPI(this.#dataBody)
		.then( res => {
      		this.#results = res;
    		this.#results.tk = this.tk;
		  
      		return this.#results
		})
		.catch( err => {
    		this.#results = err;
    		this.#results.tk = this.tk;
		  
    		return this.#results
    	});
	}

	/**
	 *  | MiPago - Recarga Paquetes|
	 * @param {number} number - Phone number to send
	 * @param {String} operador Chip operator to send
	 * @param {number} paq - paqID to send
	 * @param {String} cobro Saldo - Ganancia
	 * @return {Object} Object with data
	 */
	recargaPaq(number, operador, paq, cobro){
		number = this.#checkNumber(number)
		operador = this.#checkString(operador);
	
		if (!this.#checkNumber(number)) throw new Error("Invalid phone number");
	
		// Get the ID of the operador
		const operadorID = paquetes.get(operador).id;
		// Get the packges of operador
		const paqs = paquetes.get(operador).paqs;
		// if (!operadorID) throw new Error("Invalid operador. E1");

		paq = paqs.find(e => e.id == paq)

		if (!paq) throw new Error("Invalid package id");
	
		// Save the type of the cobro
		cobro = this.#cobroType(cobro);
	
		this.#data = Object.assign(this.#data, {
			"o": operadorID,
			"n": number,
			"p": paq.id,
			"tk": this.tk,
			"t": cobro
		})
	
		this.bill.set(this.tk, {"number": number, "paqu": paq.price, "operator": operador});
	
		// Complete the headers with the body data in json format
		this.#dataBody.body = JSON.stringify(this.#data);
	
		this.#fetchAPI(this.#dataBody)
		.then( res => {
      		this.#results = res;
      		this.#results.tk = this.tk;
		  
    		return this.#results;
		})
		.catch( err => {
      		this.#results = err;
      		this.#results.tk = this.tk;
		  
      		return this.#results;
    	});
	}

  /**
   *  | MiPago - Consulta Paquetes por operador |
   * @param {Strign} operador - Operator to search package
   * @param {String} filter - Filter to search package (optional)
   * @return {Array} Array with all packages found
   */
  queryPaqs(operador, filter = "") {
    if (!operador) throw new Error("Invalid operator");

	  operador = this.#checkString(operador);
	  filter = this.#checkString(filter);
    const paqsOp = paquetes.get(operador);
    const paqs = paqsOp.paqs;

	switch (filter) {
		case "minutos":
		  const filteredMinutos = paqs.filter(e => {
			  const name = e.name.toLowerCase();
        return (
          name.includes("min") &&
          !name.includes("todo incluido") &&
          !name.includes("internet") &&
          !(name.includes("gb") || name.includes("mb"))
        );
		  });
		  return filteredMinutos;
	
		case "internet":
		  const filteredInternet =  paqs.filter(e => {
			  const name = e.name.toLowerCase();
        return (
          name.includes("internet") ||
          name.includes("navegacion") &&
          !name.includes("todo incluido") &&
          !name.includes("min")
        );
		  });
		  return filteredInternet;

    case "ti":
      const filteredTD =  paqs.filter(e => {
        const name = e.name.toLowerCase();
        return (
          (name.includes("todo incluido") || 
            name.includes("what") ||
            name.includes("internet") ||
            name.includes("gb") || name.includes("mb") 
          ) &&
          name.includes("min")
        );
      });
      return filteredTD;
	
		default:
		  return paqs;
	  }
  }
}

/**
 * Get the information about playlists that have the user specified.
 * @param {Object} options A oject with next properties: accessToken and maxResults
 * @returns {Object} Object with response
 */
async function getYTPlaylistID(options){
	const maxResults = options.maxResults || 25;
	const params = `?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}`
    
    const URI = `https://youtube.googleapis.com/youtube/v3/playlists${params}`
    const response = await fetch(URI, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.accessToken}`
        }
    });
    var result = await response.text();
    result= JSON.parse(result);
	return result;
}

async function getPlaylistItems(playlistId, accessToken, pageToken = '') {
	if (!playlistId) throw Error('You must provide a playlist identifier');
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&maxResults=20&pageToken=${pageToken}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los elementos de la lista de reproducción:', error);
    }
}

async function getAllPlaylistItems(playlistId, accessToken) {
	if (!playlistId) throw Error('You must provide a playlist identifier');
    let items = [];
    let pageToken = '';
    do {
        const data = await getPlaylistItems(playlistId, accessToken, pageToken);
        if (data && data.items) {
            items = items.concat({ snippet: data.items.snippet, contentDetails: data.items.contentDetails });
            pageToken = data.nextPageToken || '';
        }
    } while (pageToken);
    return items;
}

module.exports = {
    "countFiles": totalArchivos, dataUser, expandPinURL,
    separarString, distubeStatus, arraysEqual, miPay, getYTPlaylistID, getAllPlaylistItems, getLocalIP
}