const mysql = require('mysql');
const { BOT } = require('./config.js');
const { promisify } = require('util');

const pool = mysql.createPool(BOT.uriDB || {
    host: BOT.hostDB,
    user: BOT.userDB,
    password: BOT.passDB,
    database: BOT.nameDB
});

pool.getConnection((err, conect) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('SE CERRO LA PUERTA A LA DATABASE')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('HAY MUCHAS CONECCIONES')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('ESA NO ES LA LLAVE DE LA PUERTA')
        }
    }

    if (conect) conect.release();
    console.log('Conectado a la database');
    return;
})

//convirtiendo a promesas

pool.query = promisify(pool.query);

function cnSQL() {
    return mysql.createConnection(process.env.URI_DB || {
        host: BOT.hostDB,
        user: BOT.userDB,
        password: BOT.passDB,
        database: BOT.nameDB
    });
}

module.exports = cnSQL;