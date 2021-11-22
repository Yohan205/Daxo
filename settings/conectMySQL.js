const mysql = require('mysql');
const { BOT } = require('./config.js');
const { promisify } = require('util');

// Prepara la coneccion a la Base de Datos
const pool = mysql.createPool(BOT.uriDB || {
    host: BOT.hostDB,
    user: BOT.userDB,
    password: BOT.passDB,
    database: BOT.nameDB
});

// Conectandose a la DB
pool.getConnection((err, conect) => {
    // Si hay errores muestre un mensaje del error en consola
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error('SE CERRO LA CONECCION A LA DATABASE')

        if (err.code === 'ER_CON_COUNT_ERROR') console.error('HAY MUCHAS CONECCIONES')
        
        if (err.code === 'ECONNREFUSED') console.error('CLAVE ERRONEA')
    }

    // Al conectarse lo muestra en consola
    if (conect) conect.release();
    console.log('Conectado a la database');
    return;
})

// Convirtiendo a promesas

pool.query = promisify(pool.query);

function cnSQL() {
    return mysql.createConnection(BOT.uriDB || {
        host: BOT.hostDB,
        user: BOT.userDB,
        password: BOT.passDB,
        database: BOT.nameDB
    });
}

module.exports = cnSQL;