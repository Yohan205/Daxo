const mysql = require('mysql');
const { BOT } = require('./config.js');
const { promisify } = require('util');
const chalk = require('chalk');

// Prepara la coneccion a la Base de Datos
const pool = mysql.createPool(BOT.DB.URI_SQL || {
    host: BOT.DB.HOST,
    user: BOT.DB.USER,
    password: BOT.DB.KEY_SQL,
    database: BOT.DB.NAME_SQL
});

// Conectandose a la DB
pool.getConnection((err, conect) => {
    // Si hay errores muestre un mensaje del error en consola
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error(chalk.bold.red('[Database] ')+'La conexión ha finalizado')

        if (err.code === 'ER_CON_COUNT_ERROR') console.error(chalk.bold.red('[Database] ')+'Demasiadas conexiones abiertas')
        
        if (err.code === 'ECONNREFUSED') console.error(chalk.bold.red('[Database] ')+'Clave errada')
    }

    // Al conectarse lo muestra en consola
    if (conect) conect.release();
    console.log(chalk.bold.green('[Database] ')+'Conexión establecida');
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